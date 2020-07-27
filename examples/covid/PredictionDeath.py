# coding: utf-8
import datetime
import numpy as np
import copy
import math
from scipy.integrate import odeint
import json
import numpy as np
import sys
from datetime import timedelta, datetime, date
import time,os
from sklearn import linear_model

import urllib.request
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-o", "--output_dir", type=str, help="the output dir, default is ./output")
parser.add_argument("-i", "--input_file", type=str, help="the input dataset file")
args = parser.parse_args()
input_file = args.input_file
output_dir = args.output_dir

def fetch():
    URL = 'https://coronavirus-tracker-api.herokuapp.com/all'
    FILENAME = 'covid-19_data.json'
    try:
        url = urllib.request.urlopen(urllib.request.Request(URL, headers={
            'User-Agent': 'https://github.com/coronafighter/coronaSEIR'}))
        r = url.read()
    except:
        raise Exception("Data source of epidemic propagation model closed.")

    print("read bytes from %s: %i" % (URL, len(r)))

    if len(r) < 1000:
        raise Exception("fetch_data.py read less than 1000 bytes")

    with open(FILENAME, 'wb') as f:
        f.write(r)

def getParameters():
    IncubPeriod=5  #Incubation period, days 潜伏期
    DurMildInf=10 #Duration of mild infections, days 轻症患者的持续时间
    FracMild=0.5  #Fraction of infections that are mild  轻症患者占所有患者的比例
    FracSevere=0.3 #Fraction of infections that are severe   中症患者站所有患者的比例
    FracCritical=0.2 #Fraction of infections that are critical   重症患者占所有患者的比例
    CFR=0.02 #Case fatality rate (fraction of infections resulting in death)   所有患者的致死率
    TimeICUDeath=7 #Time from ICU admission to death, days  从ICU到死亡的时间
    DurHosp=11 #Duration of hospitalization, days  在医院的时间

    b = [0 for i in range(10)]
    p = [0 for i in range(10)]
    g = [0 for i in range(10)]
    u = [0 for i in range(10)]

    a = 1 / IncubPeriod

    u[1] = 0.029 / 100
    u[2] = 0.50 / 100
    u[3] = 1.8 / 100
    u[6] = 0.01 / 100
    u[7] = 1.16 / 100
    u[8] = 3.4 / 100

    g[3] = (1 / TimeICUDeath) - u[3]
    g[8] = (1 / TimeICUDeath) - u[8]

    p[2] = (1 / DurHosp) * (FracCritical / (FracCritical + FracSevere))
    g[2] = (1 / DurHosp) - p[2]

    p[7] = p[2] * 5
    g[7] = g[2] / 5

    g[1] = (1 / DurMildInf) * FracMild
    p[1] = (1 / DurMildInf) - g[1]

    g[6] = g[1]
    p[6] = p[1]

    b[1] = 2.5e-4
    b[7] = 3e-4

    beds = 100000000
    ICUs = 100000000

    return (a, b, p, g, u, beds, ICUs)

def getCountryInfo():
    data = {}
    with open('covid-19_data.json') as f:
        data = json.load(f)
    countryInfo = {}
    for element in data['deaths']['locations']:
        countryName = element['country']
        if countryName == 'Taiwan*':
            continue
        deaths = []
        dates = []
        for date in element['history']:
            count = element['history'][date]
            dates.append(date)
            deaths.append(count)
        if countryName not in countryInfo:
            countryInfo[countryName] = {}
            countryInfo[countryName]['dates'] = dates
            countryInfo[countryName]['deaths'] = deaths
        else:
            for i in range(len(countryInfo[countryName]['deaths'])):
                countryInfo[countryName]['deaths'][i] += deaths[i]

    for element in countryInfo.values():
        index = 0
        while index < len(element['dates']) and element['deaths'][index] == 0:
            index += 1
        element['dates'] = element['dates'][index:]
        element['deaths'] = element['deaths'][index:]

        for i in range(len(element['dates'])):
            element['dates'][i] = datetime.strftime(datetime.strptime(element['dates'][i], "%m/%d/%y"), "%m/%d/%y")


    return countryInfo

def updatehistories(currentData, lastDate):
    g = os.walk('/media/mnt/chaozhuo/website-prediction/ncov-front/public/data/prediction/')
    for path, dir_list, file_list in g:
        for file_name in file_list:
            filepath = os.path.join(path, file_name)
            if 'deaths' not in filepath:
                continue
            with open(filepath, 'r') as f:
                hdata = json.load(f)
                for countryName in hdata:
                    if countryName == 'dates':
                        continue
                    for i in range(len(hdata['dates'])):
                        element = hdata[countryName]
                        if element['real'][i] == 0 and hdata['dates'][i] in currentData[countryName]['dates'] and datetime.strptime(hdata['dates'][i], "%m/%d/%y").date() <= lastDate:
                            element['real'][i] = currentData[countryName]['deaths'][currentData[countryName]['dates'].index(hdata['dates'][i])]
                            element['diff'][i] = abs(element['real'][i] - element['prediction'][i]) / element['real'][i]
                            element['diff'][i] = float('%0.3f' % element['diff'][i])
            with open(filepath, 'w') as f:
                json.dump(hdata,f)

def L1_loss(real, prediction):
    result = 0
    for i in range(len(real)):
        result += abs(real[i] - prediction[i])
    return result

def seir(y, t, C, a, b, g, p, u, PQ, beds, ICUs):

    dy = [0 for i in range(10)]
    dy[0] = (b[1] * y[1] + b[7] * y[7]) * C - a * y[0]
    dy[1] = a * y[0] * (1 - PQ) - (g[1] + p[1] + u[1]) * y[1]
    y2Sum = p[1] * y[1] + p[6] * y[6]

    if y2Sum + y[2] <= beds:
        dy[2] = y2Sum - (g[2] + p[2] + u[2]) * y[2]
        dy[7] = 0 - (g[7] + p[7] + u[7]) * y[7]
    else:
        dy[2] = beds - y[2] - (g[2] + p[2] + u[2]) * y[2]
        dy[7] = y2Sum - (beds - y[2]) - (g[7] + p[7] + u[7]) * y[7]

    y3Sum = p[2] * y[2] + p[7] * y[7]

    if y3Sum + y[3] <= ICUs:
        dy[3] = y3Sum - (g[3] + u[3]) * y[3]
        dy[8] = 0 - g[8] * y[8] - u[8] * y[8]
    else:
        dy[3] = ICUs - y[3] - (g[3] + u[3]) * y[3]
        dy[8] = y3Sum - (ICUs - y[3]) - g[8] * y[8] - u[8] * y[8]

    dy[4] = np.dot(g[1:3], y[1:3]) + np.dot(g[6:8], y[6:8])
    dy[5] = np.dot(u, y)
    dy[6] = a * y[0] * PQ - (g[6] + p[6] + u[6]) * y[6]

    dy[9] = a * y[0]

    return dy

def seirPrediction(y, t, Cs, a, b, g, p, u, PQ, beds, ICUs):

    C = Cs[int(np.floor(t))]

    dy = [0 for i in range(10)]
    dy[0] = (b[1] * y[1] + b[7] * y[7]) * C - a * y[0]
    dy[1] = a * y[0] * (1 - PQ) - (g[1] + p[1] + u[1]) * y[1]
    y2Sum = p[1] * y[1] + p[6] * y[6]


    if y2Sum + y[2] <= beds:
        dy[2] = y2Sum - (g[2] + p[2] + u[2]) * y[2]
        dy[7] = 0 - (g[7] + p[7] + u[7]) * y[7]
    else:
        dy[2] = beds - y[2] - (g[2] + p[2] + u[2]) * y[2]
        dy[7] = y2Sum - (beds - y[2]) - (g[7] + p[7] + u[7]) * y[7]

    y3Sum = p[2] * y[2] + p[7] * y[7]

    if y3Sum + y[3] <= ICUs:
        dy[3] = y3Sum - (g[3] + u[3]) * y[3]
        dy[8] = 0 - g[8] * y[8] - u[8] * y[8]
    else:
        dy[3] = ICUs - y[3] - (g[3] + u[3]) * y[3]
        dy[8] = y3Sum - (ICUs - y[3]) - g[8] * y[8] - u[8] * y[8]

    dy[4] = np.dot(g[1:3], y[1:3]) + np.dot(g[6:8], y[6:8])
    dy[5] = np.dot(u, y)
    dy[6] = a * y[0] * PQ - (g[6] + p[6] + u[6]) * y[6]

    dy[9] = a * y[0]

    return dy

def learnParameters(country):
    dates = country['dates']
    numbers = country['deaths']

    yList = []
    cList = []

    begin_y = [0 for i in range(10)]
    C = 2000
    PQ = 0
    window = 10

    (a, b, p, g, u, beds, ICUs) = getParameters()
    for index in range(len(numbers)):
        C_selected = 0
        maxLoss = sys.maxsize

        if index == 0:
            begin_y[0] = 0
            begin_y[1] = 1
            days = 1000

            simulatedResults = odeint(seir, begin_y, [i for i in range(days)], args=(C, a, b, g, p, u, PQ, beds, ICUs))
            simulateddeaths = simulatedResults[:,9]
            for i in range(len(simulateddeaths) - window):
                loss = L1_loss(numbers[:window], simulateddeaths[i:i+window])
                if loss < maxLoss:
                    maxLoss = loss
                    selected_y = simulatedResults[i,:]
            begin_y = selected_y
        else:
            for C in np.arange(10,10001,500):

                numberWindow = numbers[index:index + window]
                t = [i for i in range(len(numberWindow) + 1)]
                outputs = odeint(seir, begin_y, t, args=(C, a, b, g, p, u, PQ, beds, ICUs))
                deathsP = outputs[1:, 9]

                deathsLoss = L1_loss(deathsP, numberWindow)
                deathsLoss /= window
                if deathsLoss < maxLoss:
                    maxLoss = deathsLoss
                    C_selected = C
            begin_y = odeint(seir, begin_y, [0,1], args=(C_selected, a, b, g, p, u, PQ, beds, ICUs))[1,:]
        yList.append(begin_y)
        cList.append(C_selected)

    return (yList, cList)

def getPredictions(yList, cList):
    y0 = yList[-1]
    X = []
    Y = []
    windows = 10

    for i in range(len(cList) - 10, len(cList) - 4):
        X.append([cList[i], cList[i+1], cList[i+2]])
        Y.append(cList[i+3])

    reg = linear_model.LinearRegression()
    reg.fit(X, Y)
    Cs = []
    Cs.append(cList[-1])

    x = [[cList[-3],cList[-2],cList[-1]]]
    while len(Cs) <= windows + 2:
        Cs.append(min(max(10, reg.predict(x)[0]), 3000))
        x[0].pop(0)
        x[0].append(Cs[-1])

    (a, b, p, g, u, beds, ICUs) = getParameters()
    PQ = 0
    simulatedResults = odeint(seirPrediction, y0, [i for i in range(windows)], args=(Cs, a, b, g, p, u, PQ, beds, ICUs))
    simulateddeaths = simulatedResults[:, 9][1:]

    return simulateddeaths

if __name__ == '__main__':
    results = {}
    for timediff in [0]:
        currentdate = datetime.now().date() - timedelta(days=timediff)
        lastDate = currentdate - timedelta(days=2)
#        fetch()
        data = getCountryInfo()
        for element in data:
            edates = data[element]['dates']
            index = 0
            for index in range(len(edates)):
                if edates[index] == lastDate:
                    break
            data[element]['dates'] = data[element]['dates'][:index+1]
            data[element]['deaths'] = data[element]['deaths'][:index + 1]

        updatehistories(data, lastDate)

        dates = []
        for i in range(4):
            dates.append(datetime.strftime(lastDate - timedelta(days=4-i), "%m/%d/%y"))
        for i in range(8):
            dates.append(datetime.strftime(lastDate + timedelta(days=i), "%m/%d/%y"))

        location = '/media/mnt/chaozhuo/website-prediction/ncov-front/public/data/prediction/'
        type = 'death'
        date = datetime.strftime(currentdate, '%Y-%m-%d')

        history = {}
        with open(location + datetime.strftime(currentdate - timedelta(days=1), '%Y-%m-%d') + '-death.json', 'r') as f:
            history = json.load(f)

        outputfile = location + date + '-' + type + ".json"

        results['dates'] = dates

        for countryName in data:
            try:
                predictions = []
                real = []
                diff = []
                begin = time.time()
                countryData = data[countryName]
                if len(countryData['dates']) == 0:
                    predictions = [0 for i in range(len(dates))]
                    real = [0 for i in range(len(dates))]
                    diff = [0 for i in range(len(dates))]
                    results[countryName] = {'prediction': predictions, 'real': real, 'diff': diff}
                    continue

                index = countryData['dates'].index(datetime.strftime(lastDate,'%m/%d/%y'))
                countryData['dates'] = countryData['dates'][:index + 1]
                countryData['deaths'] = countryData['deaths'][:index + 1]
                (yList, cList) = learnParameters(countryData)
                # for i in range(0,5):
                #     subyList = yList[:i-5]
                #     subCList = cList[:i-5]
                #     if len(subCList) == 0 or len(subCList) == 0:
                #         predictions.append(0)
                #         real.append(0)
                #         diff.append(0)
                #         continue
                #     pr = getPredictions(subyList, subCList)[0]
                #     predictions.append(pr)
                #     real.append(countryData['deaths'][i - 5])
                #     diff.append(abs(real[-1] - predictions[-1]) / real[-1])
                #     diff[-1] = float('%0.3f'%diff[-1])

                for i in range(0,5):
                    predictions.append(history[countryName]['prediction'][i+1])
                    real.append(history[countryName]['real'][i + 1])
                    diff.append(history[countryName]['diff'][i + 1])
                real[-1] = countryData['deaths'][-1]
                diff[-1] = (abs(real[-1] - predictions[-1]) / real[-1])
                diff[-1] = float('%0.3f' % diff[-1])

                futurep = getPredictions(yList, cList)
                for i in range(7):
                    predictions.append(futurep[i])
                    real.append(0)
                    diff.append(0)
                for i in range(len(predictions)):
                    predictions[i] = int(predictions[i])
                for i in range(len(predictions) - 1):
                    if predictions[i] > predictions[i+1]:
                        predictions[i + 1] = predictions[i]
                results[countryName] = {'prediction': predictions, 'real': real, 'diff': diff}

                print(countryName + " " + str(time.time() - begin))
            except:
                print(countryName + " Error!")
                continue



        with open(outputfile, 'w') as f:
            json.dump(results, f)
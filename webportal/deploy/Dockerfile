# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

FROM node:dubnium

WORKDIR /usr/src/app

ARG VERSION
ARG API_URL=\$\{MARKETPLACE_API_URL\}
ARG NPM_INSTALL_TOKEN=\$\{NPM_INSTALL_TOKEN\}
ARG PORT=9292
ARG TARGET=https://github.com/microsoft/openpaimarketplace.git

ENV NODE_ENV=production \
    SERVER_PORT=${PORT} \
    LOG_LEVEL=info \
    MARKETPLACE_API_URL=${API_URL} \
    NPM_INSTALL_TOKEN=${NPM_INSTALL_TOKEN}

RUN git clone ${TARGET} && \
    cd openpaimarketplace && \
    git checkout ${VERSION} && \
    cd webportal && \
    npm install --production=false && \
    npm run build

EXPOSE ${SERVER_PORT}

WORKDIR /usr/src/app/openpaimarketplace/webportal

CMD ["npm", "start"]

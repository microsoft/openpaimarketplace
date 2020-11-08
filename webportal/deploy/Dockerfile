# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

FROM node:dubnium

WORKDIR /usr/src/app

ARG VERSION
ARG API_URL=\$\{MARKETPLACE_API_URL\}
ARG PORT=9292

ENV NODE_ENV=production \
    SERVER_PORT=${PORT} \
    LOG_LEVEL=info \
    MARKETPLACE_API_URL=${API_URL}

RUN git clone https://github.com/microsoft/openpaimarketplace.git && \
    cd openpaimarketplace && \
    git checkout ${VERSION} && \
    cd webportal && \
    npm install --production=false && \
    npm run build

EXPOSE ${SERVER_PORT}

WORKDIR /usr/src/app/openpaimarketplace/webportal

CMD ["npm", "start"]

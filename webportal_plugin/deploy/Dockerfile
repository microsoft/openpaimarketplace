# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

FROM node:carbon

WORKDIR /usr/src/app

ARG VERSION=v1.1.0
ARG API_URL=http://localhost:3000
ARG PORT=9292

ENV NODE_ENV=production \
    SERVER_PORT=${PORT} \
    LOG_LEVEL=info \
    MARKETPLACE_API_URL=${API_URL}

RUN git clone https://github.com/microsoft/openpaimarketplace.git && \
    cd openpaimarketplace && \
    git checkout ${VERSION} && \
    cd webportal_plugin && \
    yarn install --production=false

EXPOSE ${SERVER_PORT}

WORKDIR /usr/src/app/openpaimarketplace/webportal_plugin

CMD ["yarn", "start"]

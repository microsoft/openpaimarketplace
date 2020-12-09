# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

FROM node:dubnium

WORKDIR /usr/src/app

ARG VERSION
ARG TARGET=https://github.com/microsoft/openpaimarketplace.git

RUN git clone ${TARGET} && \
   cd openpaimarketplace && \
   git checkout ${VERSION} && \
   cd rest_server && \
   npm install

EXPOSE ${PORT}

WORKDIR /usr/src/app/openpaimarketplace/rest_server

CMD ["npm", "start"]

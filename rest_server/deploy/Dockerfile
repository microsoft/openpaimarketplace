# Copyright (c) Microsoft Corporation.
# Licensed under the MIT License.

FROM node:carbon

WORKDIR /usr/src/app

ARG VERSION

RUN git clone https://github.com/microsoft/openpaimarketplace.git && \
    cd openpaimarketplace && \
    git checkout $VERSION && \
    cd rest_server && \
    yarn install && \
    yarn start

EXPOSE ${PORT}


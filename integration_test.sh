#!/bin/bash
BASE_DIR=./integration/node_modules
yarn clean
yarn build
mkdir -p $BASE_DIR
mkdir -p ${BASE_DIR}/ng-lenta
cp -R ./dist ${BASE_DIR}/ng-lenta
cd ./integration
yarn install
yarn build
yarn e2e

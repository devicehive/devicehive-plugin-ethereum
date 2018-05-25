# Devicehive plugin ethereum

## Overview
This plugin allows you to manipulate your custom smart contract from device.

## Before the start
### Specify your config file:
*DEVICE_HIVE_PLUGIN_WS_ENDPOINT* - proxy endpoint to connect
*DEVICE_HIVE_AUTH_SERVICE_API_URL* - devicehive auth endpoint
*DEVICE_HIVE_MAIN_SERVICE_API_URL* - devicehive api reest endpoint
*PLUGIN_TOPIC* - topic of created plugin
*PLUGIN_TOKEN_LIFE_TIME_MIN* - lifetime of plugin's token
*USER_LOGIN* - devicehive's user
*USER_PASSWORD* - password
*USER_ACCESS_TOKEN*, *USER_REFRESH_TOKEN*, *PLUGIN_ACCESS_TOKEN*, *PLUGIN_REFRESH_TOKEN* - use any of them to connect your plugin
*AUTO_SUBSCRIPTION_ON_START*
*SUBSCRIPTION_GROUP*

*CONTRACT_PATH*: **,
*ETHEREUM_URL*:**,
*CONTRACT_INITIAL_ARGS*:[*0*],
*ACCOUNT_ADDRESS* - ethereum account address
*ACCOUNT_PASSWORD* - ethereum account password
*CONTRACT_ADDRESS* - contract's address, if there is no address then new will be created
*ALLOWED_METHODS* - methods, which can be used by device

## How to start
1. npm i
2. npm start
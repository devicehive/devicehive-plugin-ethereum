# Devicehive plugin ethereum

## Overview
This plugin allows you to manipulate your custom smart contract from device.

## Before the start
### Specify your config file:
*DEVICE_HIVE_PLUGIN_WS_ENDPOINT* - proxy endpoint to connect <br />
*DEVICE_HIVE_AUTH_SERVICE_API_URL* - devicehive auth endpoint <br />
*DEVICE_HIVE_MAIN_SERVICE_API_URL* - devicehive api reest endpoint <br />
*PLUGIN_TOPIC* - topic of created plugin <br />
*PLUGIN_TOKEN_LIFE_TIME_MIN* - lifetime of plugin's token <br />
*USER_LOGIN* - devicehive's user <br />
*USER_PASSWORD* - password <br />
*USER_ACCESS_TOKEN*, *USER_REFRESH_TOKEN*, *PLUGIN_ACCESS_TOKEN*, *PLUGIN_REFRESH_TOKEN* - use any of them to connect your plugin <br />
*AUTO_SUBSCRIPTION_ON_START* <br />
*SUBSCRIPTION_GROUP* <br />

*CONTRACT_PATH* - path to your smart contract, <br />
*ETHEREUM_URL* - url to ethereum node, <br />
*CONTRACT_INITIAL_ARGS* - arguments for initializing smart contract, <br />
*ACCOUNT_ADDRESS* - ethereum account address <br />
*ACCOUNT_PASSWORD* - ethereum account password <br />
*CONTRACT_ADDRESS* - contract's address, if there is no address then new will be created <br />
*ALLOWED_METHODS* - methods, which can be used by device <br />

## How to start
1. npm i
2. npm start
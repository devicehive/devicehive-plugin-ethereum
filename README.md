# Devicehive plugin ethereum

This plugin allows you to manipulate your custom smart contract via devicehive.

# Before the start

You should have ethereum node running somewhere. 
You also need ethereum account's address and password.
With this [guide](#Ethereum.docs) you can run ethereum node locally.

## Specify ethereum configuration

Firstly you should specify [ethereum configuration](#Ethereum.config).
Add ethereum url, account's address and account's password to config file *(path - ./src/ethereum-node/config.json)*. 
<br/>
*Note* - you can use example to see how it works, just do not change other fields.

## Specify plugin configuration
In [plugin configuration](#Plugin.config) there are already [playground](https://playground.devicehive.com) urls, however you can run [devicehive](https://github.com/devicehive/devicehive-docker) locally and write your own.
Add plugin topic and access token. Also add user and password for [devicehive admin panel](https://github.com/devicehive/devicehive-admin-panel).

# Simple start

1. Create plugin (locally or on playground) and specify [plugin configuration](#Plugin.config) file
2. Specify [ethereum configuration](#Ethereum.config) file (plugin will start with contract in `example` folder)
3. Run `npm i`
4. Run `npm start`
5. Send [message](#Message.model) from device. See example [here](#Message.example).
6. Wait for plugin receives the message and sends transaction to blockchain. 

Logger will notify you about results. You will see message `Transaction has been passed successfully, hash: ${transactionHash}`.

# Configuration

<a name="Plugin.config"></a>

## Plugin

You can find plugin configuration in `./config.json`
Plugin part of configuration you can find [here](https://github.com/devicehive/devicehive-plugin-core-node#configuration).

**_PLUGIN_PROPS_** - plugin's properties. There are only filters at the moment.
**_PLUGIN_PROPS.OVERRIDE_** - set it to true and plugin's filters will be updated according to config.
**_FILTERS_** - filters for your plugin.
**_LOGGER_** - logger configuration.

Examples:

    "FILTERS":{
        "notifications": true,
        "commands": false,
        "command_updates": false,
        "names": "blockchain-record"
    }

    "LOGGER":{
        "level": 0, // 0 - info + error, 1 - error
        "filePath": "./dhe-log.txt"
    }

<a name="Ethereum.config"></a>

## Ethereum smart contract

You can find configuration in `./src/ethereum-node/config.json`

* **_CONTRACT_PATH_** - path to your smart contract, <br />
* **_ETHEREUM_URL_** - url to ethereum node, <br />
* **_CONTRACT_INITIAL_ARGS_** - arguments for initializing smart contract, <br />
* **_ACCOUNT_ADDRESS_** - ethereum account address <br />
* **_ACCOUNT_PASSWORD_** - ethereum account password <br />
* **_GAS_LIMIT_** - maximum gas limit which can be used by device <br />
* **_TIME_PERIOD_** - time period in minutes, every `TIME_PERIOD` minutes gas limit will be updated <br />
* **_CONTRACT_ADDRESS_** - contract's address, which plugin will use <br />
* **_OVERRIDE_CONTRACT_** - set it to true, if you want to create new contract <br />
* **_ALLOWED_METHODS_** - methods, which can be used by device <br />

#Plugin parameters

After successfull creation of the contract plugin's parameters will be overwritten.<br />
They will store ethereum node url, contract's address, allowed methods and initial transaction's hash.

<a name="Message.example">

# Message example
Message name: `blockchain-record`
Parameters:
    {
        "method": "increase",
        "args": {
            "amount": 1
        },
        "options": {}
    }

<a name="Message.model"></a>

# Message model
    {
        "method":*method_name*,
        "args":{
            "arg1",
            "arg2",
            ...
        },
        "options":{
            "gas", // optional
            "gasPrice", // optional
            "value"" // optional
        }
    }
*Note*: if gas or gasPrice are not specified then plugin will use min amount of gas for transaction.

<a name="Ethereum.docs"></a>

# How to run ethereum node locally

To start ethereum locally:

*Note* - with this guide you will run dev node, so you will not be working with real ethereum.

1. Download and install `geth`.
2. Open terminal and run `geth --mine --minerthreads=1 --networkid=1999 --rpc --rpcaddr "127.0.0.1"  --rpcapi="admin,debug,miner,shh,txpool,personal,eth,net,web3" --dev`.
3. Open another terminal window and run `geth attach http://localhost:8545`.
4. In second window run `personal.newAccount()` and enter your password. You will get account's address.
5. Make sure you have enough ethereum. You can run `eth.accounts.forEach(function(account){if(account!==eth.coinbase){eth.sendTransaction({from:eth.coinbase,to:account,value:web3.toWei(1000000)})}})` to increase it on your account. You will see `undefined` in response. It means that transaction has been finished successfully.

*Note* - you can check your account's balance by entering `web3.fromWei(eth.getBalance(${ACCOUNT_ADDRESS}), "ether")` command.
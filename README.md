# Devicehive plugin ethereum

This plugin allows you to manipulate your custom smart contract via devicehive.

# Before the start

You should have ethereum node running somewhere. 
You also need ethereum account's address and password.
With this [guide](#Ethereum.docs) you can run ethereum node locally.

## Specify ethereum configuration

Firstly you should specify [ethereum configuration](#Ethereum.config).
Add ethereum url, account's address and account's password to config file *(path - ./src/ethereum-node/config.json)*. 
Do not forget to specify gas limit and time period update.
<br/>
*Note* - you can use example to see how it works, just fill account and password fields.

<br/>
Then add contract's path and methods, which could be used by device.

You can also specify contract's address if you have it. If it is not written, then new contract will be created for the first start.
The contract's address will be stored in plugin parameters. 

*Note* - you can create new contract instance. Just set `CREATE_NEW_CONTRACT=true` and do not forget to set initial arguments for deployment.

## Specify plugin configuration

Add devicehive's urls and plugin topic according to [plugin configuration](#Plugin.config). 
Add access token.
You can also specify filters for plugin.


# How it works

1. Start devicehive
2. Create plugin and specify plugin [plugin configuration](#Plugin.config) file
3. Create smart contract and specify [ethereum configuration](#Ethereum.config) file
4. Run `npm i`
5. Run `npm start`
6. Send [message](#Message.model) from device
7. Wait for plugin receives the message and sends transaction to blockchain

# Configuration

<a name="Plugin.config"></a>

## Plugin
Plugin part of configuration you can find [here](https://github.com/devicehive/devicehive-plugin-core-node#configuration).

**_FILTERS_** - filters for your plugin.

Example:

    "FILTERS":{
        "notifications": true,
        "commands": false,
        "command_updates": false,
        "names": "blockchain-record"
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
* **_CONTRACT_ADDRESS_** - contract's address <br />
* **_CREATE_NEW_CONTRACT_** - set it to true, if you want to create new contract <br />
* **_ALLOWED_METHODS_** - methods, which can be used by device <br />


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
5. Make sure you have enough ethereum. You can run `eth.accounts.forEach(function(account){if(account!==eth.coinbase){eth.sendTransaction({from:eth.coinbase,to:account,value:web3.toWei(1000000)})}})` to increase it on your account.

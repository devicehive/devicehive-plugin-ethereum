# Devicehive plugin ethereum

This plugin allows you to manipulate your custom smart contract via devicehive.

# Before the start

You should have ethereum node running somewhere. 
You also need ethereum account's address and password.
With this [guide](#Ethereum.docs) you can run ethereum node locally.

## Specify ethereum configuration

Firstly you should specify [ethereum configuration](#Ethereum.config).
Add ethereum url, account's address and account's password to config file *(path - ./src/ethereum-node/config.json)*. 
Then add contract's path and methods, which could be used by device.

You can also specify contract's address if you have it. If it is not written, then new contract will be created for the first start.
The contract's address will be stored in plugin parameters. 

*Note* - you can create new contract instance. Just set `CREATE_NEW_CONTRACT=true` and do not forget to set initial arguments for deployment.

*Note* - you can use example to see how it works, just fill account and password fields.

## Specify plugin configuration

Add devicehive's url according to [plugin configuration](#Plugin.config). 
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

* **_ CONTRACT_PATH _** - path to your smart contract, <br />
* **_ ETHEREUM_URL _** - url to ethereum node, <br />
* **_ CONTRACT_INITIAL_ARGS _** - arguments for initializing smart contract, <br />
* **_ ACCOUNT_ADDRESS _** - ethereum account address <br />
* **_ ACCOUNT_PASSWORD _** - ethereum account password <br />
* **_ CONTRACT_ADDRESS _** - contract's address <br />
* **_ CREATE_NEW_CONTRACT _** - set it to true, if you want to create new contract <br />,
* **_ ALLOWED_METHODS _** - methods, which can be used by device <br />


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
*Note*: if you won't specify gas or gasPrice then plugin will use min amount of gas for transaction.


<a name="Ethereum.docs"></a>

# How to run ethereum node locally

To start ethereum locally:

*Note* - with this guide you will run dev node, so you will not be working with real ethereum.

1. Download and install `geth`.
2. Open terminal and run `geth --mine --minerthreads=1 --networkid=1999 --rpc --rpcaddr "127.0.0.1"  --rpcapi="admin,debug,miner,shh,txpool,personal,eth,net,web3" --dev`.
3. Open another terminal window and run `geth attach http://localhost:8545`.
4. In second window run `personal.newAccout()` and enter your password. You will get account's address.
5. Make sure you have enough ethereum. You can run `eth.accounts.forEach(function(account){if(account!==eth.coinbase){eth.sendTransaction({from:eth.coinbase,to:account,value:web3.toWei(1000000)})}})` to increase it on your account.

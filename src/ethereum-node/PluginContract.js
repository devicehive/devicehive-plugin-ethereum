const Web3 = require('web3');

class PluginContract {

    constructor(account) {
        this._account = account;
        this._contract = null;
        this.INITIALIZED = false;
    }

    get address(){
        return this._contract._address;
    }

    /**
     * 
     * @param {string} contractPath 
     * @param {string} contractAddress 
     */
    async init(contractPath, contractAddress = null, args = []) {
        this._contract = await this._account.initContract(contractPath, contractAddress, args);
        this.INITIALIZED = true;
    }
    /**
     * 
     * @param {string} method 
     * @param {Object} args 
     * @param {Object} options 
     */
    async sendTransaction(params) {

        const args = params.getArgsArray(this._contract.options.jsonInterface);

        params.options.setSender(this._account.coinBase);

        this._account.unlockAccount();

        if (this._contract.methods[params.method](...args)._method.constant) {
            return await this._contract.methods[params.method](...args).call({from: params.options.from});
        } else {

            const gasCost = await this._contract.methods[params.method](...args).estimateGas(params.options);

            if (!params.options.gas) {
                params.options.setGas(gasCost);
            } else if (params.options.gas && params.options.gas < gasCost){
                throw new Error('gasPrice or gas is too Low')
            }

            const payabale = await this._account.checkPayablePossibility(gasCost);

            if (payabale) {
                return await this._contract.methods[params.method](...args).send(params.options);
            } else {
                throw new Error('Not enough eth')
            }
        }

    }
}

module.exports = PluginContract;

const TransactionOptions = require('./TransactionOptions');

class MessageParams {
    constructor({ method = "", args = {}, options = new TransactionOptions() }) {
        this._method = method;
        this._args = args;
        this._options = new TransactionOptions(options);
    }

    get method(){
        return this._method;
    }

    get args(){
        return this._args;
    }

    get options(){
        return this._options;
    }

    /**
     * @param {Object} jsonInterface - interface of smartcontract
     * 
     * @returns {Array<String>}
     */
    getArgsArray(jsonInterface){
        //TODO: save result
        const argsNames = jsonInterface.find(item => item.name === this.method).inputs.map(arg => arg.name);
        const argsArray = [];

        argsNames.forEach(argName => {
            argsArray.push(this.args[argName]);
        });
        return argsArray;
    }
}

module.exports = MessageParams;
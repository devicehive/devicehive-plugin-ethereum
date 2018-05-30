const TransactionOptions = require('./TransactionOptions');
const Utils = require('../../utils/Utils');

class MessageParams {
    constructor({ method = "", args = {}, options = new TransactionOptions() }) {
        this._method = method;
        this._args = args;
        this._options = new TransactionOptions(options);
    }

    get method() {
        return this._method;
    }

    get args() {
        return this._args;
    }

    get options() {
        return this._options;
    }

    /**
     * @param {Object} jsonInterface - interface of smartcontract
     * 
     * @returns {Array<String>}
     */
    getArgsArray(jsonInterface) {
        const methodArgs = Utils.getArgsNamesArrayFromObject(this.args);

        const argsNames = jsonInterface
            .find(item => {
                const itemArgsNames = item.inputs.map(input => input.name);
                return item.name === this.method && Utils.compareStringArrays(methodArgs, itemArgsNames);
            })
            .inputs.map(arg => arg.name);

        const argsValuesArray = [];

        argsNames.forEach(argName => {
            argsValuesArray.push(this.args[argName]);
        });

        return argsValuesArray;
    }
}

module.exports = MessageParams;
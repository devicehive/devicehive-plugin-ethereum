class TransactionOptions {
    constructor({ from = "", gas, gasPrice, value } = {}) {
        this.from = from;
        this.gas = gas;
        this.gasPrice = gasPrice;
        this.value = value;
    }

    /**
     * @param {String} sender - sender's address
     */
    setSender(sender) {
        this.from = sender;
    }

    /**
     * @param {Number} gas - maximum amount of gas
     */
    setGas(gas) {
        this.gas = gas;
    }

    /**
    * @param {String} gasPrice - gas price for an operation
    */
    setGasPrice(gasPrice) {
        this.gasPrice = gasPrice;
    }

    /**
    * @param {Number|String} value - value
    */
    setValue(value) {
        this.value = value;
    }
}

module.exports = TransactionOptions;
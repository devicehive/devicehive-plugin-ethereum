const ethereumConfig = require ('../../ethereum-config.json');

class GasLimiter {
    constructor(gasLimit, timePeriod) {
        this.startTime = Date.now();
        this.timePeriod = timePeriod * 60 * 1000;
        this.gasLimit = gasLimit;
        this.gasLeft = gasLimit;
    }

    get balance() {
        return this.gasLeft;
    }

    pay(gas) {
        this.checkUpdate();
        if (this.gasLeft >= gas) {
            this.gasLeft -= gas;
            return true;
        }
        return false;
    }

    checkUpdate() {
        if (this.startTime + this.timePeriod < Date.now()) {
            this.startTime = Date.now();
            this.gasLeft = this.gasLimit;
        }
    }

}

module.exports = new GasLimiter(ethereumConfig.GAS_LIMIT, ethereumConfig.TIME_PERIOD);
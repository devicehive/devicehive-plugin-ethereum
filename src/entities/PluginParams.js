const deepEqual = require('fast-deep-equal');

class PluginParams {
    constructor({
        nodeUrl = "",
        contractAddress = "",
        allowedMethods = []
    }) {
        this.nodeUrl = nodeUrl;
        this.contractAddress = contractAddress
        this.allowedMethods = allowedMethods
    }

    setContractAddress(address) {
        this.contractAddress = address;
    }

    updateToConfig(config) {
        if (config.ETHEREUM_URL && config.ALLOWED_METHODS) {

            if (config.CREATE_NEW_CONTRACT || this.nodeUrl !== config.ETHEREUM_URL ||
                (!deepEqual(config.ALLOWED_METHODS, this.allowedMethods))
            ) {
                this.nodeUrl = config.ETHEREUM_URL;
                this.allowedMethods = config.ALLOWED_METHODS;
                this.contractAddress = config.CREATE_NEW_CONTRACT ? "" : config.CONTRACT_ADDRESS;
                return true;
            } else if (config.CONTRACT_ADDRESS && config.CONTRACT_ADDRESS !== this.contractAddress) {
                this.contractAddress = config.CONTRACT_ADDRESS;
                return true;
            }
        }
        return false;
    }
}

module.exports = PluginParams;

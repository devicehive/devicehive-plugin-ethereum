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

    setContractAddress(address){
        this.contractAddress = address;
    }

    updateToConfig(config) {
        if (config.ETHEREUM_URL && config.CONTRACT_ADDRESS && config.ALLOWED_METHODS){

            if (this.nodeUrl !== config.ETHEREUM_URL || this.contractAddress !== config.CONTRACT_ADDRESS ||
                (this.allowedMethods.length !== config.ALLOWED_METHODS &&
                    !this.allowedMethods.every((el, i) => config.ALLOWED_METHODS[i] === el))
                ){
                        this.nodeUrl = config.ETHEREUM_URL;
                        this.contractAddress = config.CONTRACT_ADDRESS;
                        this.allowedMethods = config.ALLOWED_METHODS;
                        return true;
                }
        }
        return false;
    }
}

module.exports = PluginParams;
const config = require('../ethereum-node/config.json');
const Utils = require('./Utils');

class PluginEthereumUtils {
    /**
     * 
     * @param {MessageParams} params 
     * @returns {boolean}
     */
    static checkMethodIsAllowed(params) {
        const msgArgs = Utils.getArgsNamesArrayFromObject(params.args);

        const index = config.ALLOWED_METHODS.findIndex(method => {
            return method.name === params.method && Utils.compareStringArrays(msgArgs,method.args);
        });

        return index !== -1;
    }
}

module.exports = PluginEthereumUtils;
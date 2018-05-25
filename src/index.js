const { DeviceHivePlugin } = require(`devicehive-plugin-core`);
const DeviceHive = require('devicehive');

const config = require(`../config.json`);
const EthereumAccount = require('./ethereum-node/EthereumAccount');
const PluginContract = require('./ethereum-node/PluginContract');
const PluginEthereum = require('./PluginEthereum');
const PluginService = require('./service/PluginService');

const pluginService = new PluginService(config);

pluginService.init().then(() => {
    return pluginService.getPluginParameters(config.PLUGIN_TOPIC);
}).then(params => {
    if (params.updateToConfig(config)) {
        return pluginService.updatePluginParameters(config.PLUGIN_TOPIC, params);
    } else {
        return params;
    }
}).then(params => {

    const account = new EthereumAccount(params.nodeUrl, config.ACCOUNT_ADDRESS, config.ACCOUNT_PASSWORD);
    const contract = new PluginContract(account);

    contract.init(config.CONTRACT_PATH, params.contractAddress, config.CONTRACT_INITIAL_ARGS).then(() => {
        if (contract.address !== params.contractAddress) {
            params.setContractAddress(contract.address);
            pluginService.updatePluginParameters(config.PLUGIN_TOPIC, params);
        }
        const pluginEthereum = new PluginEthereum(contract);
        DeviceHivePlugin.start(pluginEthereum, config);
    });
});

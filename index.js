const { DeviceHivePlugin } = require(`devicehive-plugin-core`);
const DeviceHive = require('devicehive');

const pluginConfig = require('./config/index');
const ethereumConfig = require('./src/ethereum-node/config.json');

const EthereumAccount = require('./src/ethereum-node/EthereumAccount');
const PluginContract = require('./src/ethereum-node/PluginContract');
const PluginEthereumService = require('./src/PluginEthereumService');
const DeviceHiveService = require('./src/service/DeviceHiveService');

const deviceHiveService = new DeviceHiveService(pluginConfig);

deviceHiveService.init().then(() => {
    return deviceHiveService.getPluginParameters(pluginConfig.PLUGIN_TOPIC);
}).then(params => {
    if (params.updateToConfig(ethereumConfig)) {
        return deviceHiveService.updatePluginParameters(pluginConfig.PLUGIN_TOPIC, params);
    } else {
        return params;
    }
}).then(params => {

    const account = new EthereumAccount(params.nodeUrl, ethereumConfig.ACCOUNT_ADDRESS, ethereumConfig.ACCOUNT_PASSWORD);
    const contract = new PluginContract(account);

    contract.init(ethereumConfig.CONTRACT_PATH, params.contractAddress, ethereumConfig.CONTRACT_INITIAL_ARGS).then(() => {
        if (contract.address !== params.contractAddress) {
            console.log(`New contract has been created. Address: ${contract.address}`);
            params.setContractAddress(contract.address);
            deviceHiveService.updatePluginParameters(pluginConfig.PLUGIN_TOPIC, params);
        }
        const pluginEthereumService = new PluginEthereumService(contract);
        DeviceHivePlugin.start(pluginEthereumService, pluginConfig);
    });
});

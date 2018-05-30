const { DeviceHivePlugin } = require(`devicehive-plugin-core`);

const pluginConfig = require('./config/index');
const ethereumConfig = require('./src/ethereum-node/config.json');
const EthereumAccount = require('./src/ethereum-node/EthereumAccount');
const PluginContract = require('./src/ethereum-node/PluginContract');
const PluginEthereumService = require('./src/PluginEthereumService');
const DeviceHiveService = require('./src/service/DeviceHiveService');
const PluginEntity = require('./src/entities/plugin/PluginEntity');
const PluginFilters = require('./src/entities/plugin/PluginFilters');

const deviceHiveService = new DeviceHiveService(pluginConfig);

deviceHiveService.init().then(() => {
    return deviceHiveService.getPluginByTopic(pluginConfig.PLUGIN_TOPIC);
}).then(plugin => {

    const configFilters = new PluginFilters(pluginConfig.FILTERS);

    if (!configFilters.equals(plugin.filter) || plugin.parameters.updateToConfig(ethereumConfig)) {
        plugin.setStatus(PluginEntity.STATUSES.DISABLED);
        plugin.filter.setFiltersFromConfig(pluginConfig.FILTERS);
        return deviceHiveService.updatePlugin(plugin);
    }
    return plugin;

}).then(plugin => {
    if (plugin.status === PluginEntity.STATUSES.DISABLED) {
        plugin.setStatus(PluginEntity.STATUSES.ACTIVE);
        return deviceHiveService.updatePlugin(plugin);
    }
    return plugin;
}).then(plugin => {
    const params = plugin.parameters;

    const account = new EthereumAccount(params.nodeUrl, ethereumConfig.ACCOUNT_ADDRESS, ethereumConfig.ACCOUNT_PASSWORD);
    const contract = new PluginContract(account);

    contract.init(ethereumConfig.CONTRACT_PATH, params.contractAddress, ethereumConfig.CONTRACT_INITIAL_ARGS).then(() => {
        if (contract.address !== params.contractAddress) {
            console.log(`New contract has been created. Address: ${contract.address}`);
            params.setContractAddress(contract.address);
            deviceHiveService.updatePluginParameters(plugin.topicName, params);
        }
        const pluginEthereumService = new PluginEthereumService(contract);
        DeviceHivePlugin.start(pluginEthereumService, pluginConfig);
    });
});

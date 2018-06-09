const { DeviceHivePlugin } = require(`devicehive-plugin-core`);

const log = require('./src/utils/Logger');
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

    if (pluginConfig.PLUGIN_PROPS.OVERRIDE || plugin.parameters.updateToConfig(ethereumConfig)){
        plugin.setStatus(PluginEntity.STATUSES.DISABLED);

        if (pluginConfig.PLUGIN_PROPS.OVERRIDE){
            plugin.filter.setFiltersFromConfig(pluginConfig.PLUGIN_PROPS.FILTERS);
        }

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

    contract.init(ethereumConfig.CONTRACT_PATH, params, ethereumConfig.CONTRACT_INITIAL_ARGS).then(() => {
        if (contract.address !== params.contractAddress) {
            log.info(`New contract has been created. Address: ${contract.address}`);
            params.setContractAddress(contract.address);
            params.setInitialTransactionHash(contract.getInitialTransactionHash());
            deviceHiveService.updatePluginParameters(plugin.topicName, params);
        }
        const pluginEthereumService = new PluginEthereumService(contract);
        DeviceHivePlugin.start(pluginEthereumService, pluginConfig);
    })
        .catch(err => log.error(err));
}).catch(err => log.error(err));

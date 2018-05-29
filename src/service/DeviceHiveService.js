const DeviceHive = require('devicehive');
const PluginParams = require('../entities/PluginParams');
const PluginListQuery = DeviceHive.models.query.PluginListQuery;
const PluginUpdateQuery = DeviceHive.models.query.PluginUpdateQuery;

class DeviceHiveService {
    constructor(config) {
        this._httpDeviceHive = new DeviceHive({
            login: config.USER_LOGIN,
            password: config.USER_PASSWORD,
            mainServiceURL: config.DEVICE_HIVE_MAIN_SERVICE_API_URL,
            authServiceURL: config.DEVICE_HIVE_AUTH_SERVICE_API_URL,
            pluginServiceURL: config.DEVICE_HIVE_MAIN_SERVICE_API_URL
        });
    }

    async init() {
        return await this._httpDeviceHive.connect();
    }

    /**
     * @param {String} topic
     * @returns {Object} 
     */
    async getPluginByTopic(topic) {
        const query = new PluginListQuery({ topicName: topic });
        const pluginList = await this._httpDeviceHive.plugin.list(query);
        return pluginList[0];
    }

    /**
     * @param {String} topic
     * @returns {PluginParams} 
     */
    async getPluginParameters(topic){
        const query = new PluginListQuery({ topicName: topic });
        const pluginList = await this._httpDeviceHive.plugin.list(query);
        const params = new PluginParams(pluginList[0].parameters)
        return params;
    }

    /**
     * @param {String} topic
     * @param {PluginParams} parameters
     * @returns {PluginParams} 
     */
    async updatePluginParameters(topic, parameters) {
        const jsonParameters = JSON.stringify(parameters);
        const query = new PluginUpdateQuery({ topicName: topic, parameters: jsonParameters });
        await this._httpDeviceHive.plugin.update(query);
        return parameters;
    }
}

module.exports = DeviceHiveService;
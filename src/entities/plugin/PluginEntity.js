const PluginParams = require('./PluginParams');
const DeviceHive = require('devicehive');
const PluginUpdateQuery = DeviceHive.models.query.PluginUpdateQuery;

const PluginFilters = require('./PluginFilters');

class PluginEntity {

    static get STATUSES() {
        return {
            ACTIVE: 'ACTIVE',
            DISABLED: 'INACTIVE'
        }
    }

    constructor({ topicName = '', status = PluginEntity.STATUSES.DISABLED, filter = '////', parameters = {} }) {
        this.topicName = topicName;
        this.status = status;
        this.parameters = new PluginParams(parameters);
        this.filter = new PluginFilters();
        this.filter.setFiltersFromStringQuery(filter);
    }

    setStatus(status){
        this.status = status;
    }

    setParameters(params){
        this.parameters = params;
    }

    getPluginUpdateQueryObject(){
        return new PluginUpdateQuery({
            topicName: this.topicName,
            names: this.filter.names,
            status: this.status,
            parameters: JSON.stringify(this.parameters),
            returnCommands: this.filter.commands,
            returnUpdatedCommands: this.filter.command_updates,
            returnNotifications: this.filter.notifications
        });
    }
}

module.exports = PluginEntity;
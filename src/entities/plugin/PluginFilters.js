class PluginFilters {
    constructor({ notifications = true, commands = false, command_updates = false, names = '' } = {}) {
        this.notifications = notifications;
        this.commands = commands;
        this.command_updates = command_updates;
        this.names = names;
    }

    setNames(names) {
        this.names = names;
    }

    /**
     * 
     * @param {String} filterQuery - plugin's filter string query
     */
    setFiltersFromStringQuery(filterQuery) {
        const filterArray = filterQuery.split('/');
        const msgFilter = filterArray[0];
        switch (msgFilter) {
            case '*':
                this.notifications = true;
                this.commands = true;
                this.command_updates = true;
                break;
            case '':
                this.notifications = false;
                this.commands = false;
                this.command_updates = false;
                break;
            default:
                this.notifications = msgFilter.indexOf('notification') !== -1;
                this.commands = msgFilter.indexOf('command') !== -1;
                this.command_updates = msgFilter.indexOf('command_update') !== -1;
        }

        this.names = filterArray[4];
    }

    setFiltersFromConfig({ notifications, commands, command_updates, names }) {
        this.notifications = notifications;
        this.commands = commands;
        this.command_updates = command_updates;
        this.names = names;
    }

    equals(filters) {
        return filters.notifications === this.notifications &&
            filters.commands === this.commands &&
            filters.command_updates === this.command_updates &&
            filters.names === this.names;
    }
}

module.exports = PluginFilters;
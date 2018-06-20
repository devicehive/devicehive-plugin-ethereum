const configurator = require('json-evn-configurator');
const path = require('path');

module.exports = configurator(path.resolve(__dirname,'../config.json'));
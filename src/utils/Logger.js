const path = require('path');
const fs = require('fs');
const config = require('../../config/index').LOGGER;

class Logger {
    constructor({ level = 0, filePath = '' }) {
        this.level = level;
        this.filePath = filePath;
    }

    /**
     * 
     * @param {String} msg
     */
    info(msg) {
        const logMsg = this.processMessage(msg);
        if (this.level === 0) {
            console.log(logMsg);
            this.writeToFile(logMsg);
        }
    }

    /**
     * 
     * @param {String} msg 
     */
    error(msg) {
        const logMsg = this.processMessage(msg);
        console.error(logMsg);
        this.writeToFile(logMsg);
    }

    /**
     * 
     * @param {String} logMsg - this message will be written into file without any processing
     */
    writeToFile(logMsg) {
        if (this.filePath) {
            fs.appendFileSync(path.resolve(this.filePath), logMsg, 'utf-8');
        }
    }

    /**
     * 
     * @param {String} msg
     * 
     * @returns {String}
     */
    processMessage(msg){
        const now = new Date();        
        const logMessage = `[${now.toTimeString().split(' ')[0]} ${now.toDateString()}] - ${msg}\n`;
        return logMessage;
    }
}
module.exports = new Logger(config);
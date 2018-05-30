const { DeviceHivePlugin } = require(`devicehive-plugin-core`);
const { MessageBuilder, MessageUtils } = require(`devicehive-proxy-message`);
const PluginEthereumUtils = require('./utils/PluginEthereumUtils')

const MessageParams = require('./entities/message/MessageParams');


/**
 * Plugin main class
 */
class PluginService extends DeviceHivePlugin {

    /**
     * 
     * @param {PluginContract} contract 
     */
    constructor(contract) {
        super();
        this._contract = contract;
    }

    /**
     * Before plugin starts hook
     */
    beforeStart() {
        console.log(`Plugin is starting`);
    }

    /**
     * After plugin starts hook
     */
    afterStart() {
        const me = this;

        console.log(`Plugin has been started. Subscribed: ${me.isSubscribed}. Topic: ${me.topic}`);

        me.sendMessage(MessageBuilder.health());
    }

    /**
     * Message handler
     * @param message
     */
    handleMessage(message) {

        switch (message.type) {
            case MessageUtils.HEALTH_CHECK_TYPE:
                console.log(`NEW HEALTH CHECK TYPE MESSAGE. Payload: ${message.payload}`);
                break;
            case MessageUtils.TOPIC_TYPE:
                console.log(`NEW TOPIC TYPE MESSAGE. Payload: ${message.payload}`);
                break;
            case MessageUtils.PLUGIN_TYPE:
                console.log(`NEW PLUGIN TYPE MESSAGE. Payload: ${message.payload}`);
                break;
            case MessageUtils.NOTIFICATION_TYPE:
                try {
                    const messageBody = JSON.parse(message.payload.message).b;

                    if (messageBody.notification) {

                        this.callContractMethod(messageBody.notification.parameters);

                    } else if (messageBody.command) {
                        this.callContractMethod(messageBody.command.parameters);
                        if (messageBody.command.isUpdated) {
                            console.log(`NEW COMMAND UPDATE TYPE MESSAGE. Command: ${JSON.stringify(messageBody.command)}`);
                        } else {
                            console.log(`NEW COMMAND TYPE MESSAGE. Command: ${JSON.stringify(messageBody.command)}`);
                        }
                    } else {
                        console.log(`UNKNOWN MESSAGE. Body: ${messageBody}`);
                    }
                } catch (error) {
                    console.log(`UNEXPECTED ERROR`);
                    console.log(error);
                }
                break;
            default:
                console.log(`UNKNOWN MESSAGE TYPE`);
                console.log(message);
                break;
        }
    }

    callContractMethod(params){
        const msgParams = new MessageParams(params);

        if (PluginEthereumUtils.checkMethodIsAllowed(msgParams)) {
            this._contract.sendTransaction(msgParams);
        } else {
            throw new Error('Method is forbidden');
        }
    }

    /**
     * Before plugin stops hook
     */
    beforeStop() {
        console.log(`Plugin will stop soon`);
    }

    /**
     * Plugin error handler
     */
    onError(error) {
        console.warn(`PLUGIN ERROR: ${error}`);
    }
}

module.exports = PluginService;
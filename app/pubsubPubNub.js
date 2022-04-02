const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-2a058f57-76cf-419b-b55a-45029cdc0721',
    subscribeKey: 'sub-c-464977d8-a573-11ec-8a23-de1bbb7835db',
    secretKey: 'sec-c-NDNiNzA2NTgtNTQzZS00ZWZiLTliYWMtYmVhNGQ1MDhkZTI5'
};

const CHANNELS = {
    // TEST: 'TEST',
    // TESTTWO: 'TESTTWO'
    TEST: 'TEST'
};

class PubSub {
    constructor() {
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS)});

        this.pubnub.addListener(this.listener());
    }

    listener() {
        return {
            message: messageObject => {
                const {channel, message} = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
            }
        };
    }

    publish({channel, message}){
        this.pubnub.publish({ channel, message });
    }

}

// const testPubSub = new PubSub();
// testPubSub.publish({channel: CHANNELS.TEST, message: 'hello pubnub'});

module.exports = PubSub;
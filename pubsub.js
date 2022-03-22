const redis = require ('redis');

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({blockchain}){
        this.blockchain = blockchain;

        // konekcija na redis na wsl u windowsu na hostu
        //this.publisher = redis.createClient();
        //this.subscriber = redis.createClient();
        
        //konekcija na docker contejner na istom kompu
        this.publisher = redis.createClient( { host: '127.0.0.1',
        port: 6380,});
        this.subscriber = redis.createClient( { host: '127.0.0.1',
        port: 6380,});


        // this.subscriber.subscribe(CHANNELS.TEST);
        // this.subscriber.subscribe(CHANNELS.BLOCKCHAIN);
        this.subscribeToChannels();


        this.subscriber.on(
            'message',
            (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message){
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    
        const parsedMessage = JSON.parse(message);

        if (channel === CHANNELS.BLOCKCHAIN) {
            this.blockchain.replaceChain(parsedMessage);
        }
    
    }

    subscribeToChannels() {
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        });
    }

    publish({ channel, message }) {
        this.publisher.publish(channel, message);
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}

// const testPubSub = new PubSub();
// setTimeout(() => console.log(testPubSub.publisher.connected), 1000);
// setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'foo'), 1000);
// setTimeout(() => console.log(testPubSub.subscriber.connected), 1000);
// setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'food'), 5000);
// setTimeout(() => console.log(testPubSub.publisher.connected), 10000);
// setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'foodd'), 10000);

module.exports = PubSub;
const redis = require ('redis');

const CHANNELS = {
    TEST: 'TEST'
};

class PubSub {
    constructor(){
        //this.publisher = redis.createClient();
        //this.subscriber = redis.createClient();
        this.publisher = redis.createClient( { host: '127.0.0.1',
        port: 6379,});
        this.subscriber = redis.createClient( { host: '127.0.0.1',
        port: 6379,});
        // this.publisher = redis.createClient({
        //     host:'127.0.0.1',
        //     port:'6379', 
        //     legacyMode: true,
        //     enableOfflineQueue: false,
        //     retry_strategy(options) {
        //       if (options.error && options.error.code === 'ECONNREFUSED') {
        //         return new Error('The server refused the connection');
        //       }
        //       if (options.total_retry_time > 1000 * 60 * 60) {
        //         return new Error('Retry time exhausted');
        //       }
        //       if (options.times_connected > 10) {
        //         return undefined;
        //       }
        //       return Math.max(options.attempt * 100, 3000);
        //     },
        // });
        //console.log(this.publisher.connected);
        // this.subscriber = redis.createClient({
        //     host:'127.0.0.1',
        //     port:'6379', 
        //     legacyMode: true,
        //     enableOfflineQueue: false,
        //     retry_strategy(options) {
        //       if (options.error && options.error.code === 'ECONNREFUSED') {
        //         return new Error('The server refused the connection');
        //       }
        //       if (options.total_retry_time > 1000 * 60 * 60) {
        //         return new Error('Retry time exhausted');
        //       }
        //       if (options.times_connected > 10) {
        //         return undefined;
        //       }
        //       return Math.max(options.attempt * 100, 3000);
        //     },
        // });
    
        // if(this.publisher.connected) {
        //     console.log('publisher je konektovan');
            
        // }
        // else {
        //     console.log('publisher nije konektovan');
        // }

        // this.publisher = redis.createClient({
        //     host: '127.0.0.1',
        //     port: 6379,
        //     enableOfflineQueue: false,
        //     retry_strategy(options) {
        //       if (options.error && options.error.code === 'ECONNREFUSED') {
        //         return new Error('The server refused the connection');
        //       }
        //       if (options.total_retry_time > 1000 * 60 * 60) {
        //         return new Error('Retry time exhausted');
        //       }
        //       if (options.times_connected > 10) {
        //         return undefined;
        //       }
        //       return Math.max(options.attempt * 100, 3000);
        //     },
        // });


        // this.subscriber = redis.createClient({
        //     host: '127.0.0.1',
        //     port: 6379,
        //     enableOfflineQueue: false,
        //     retry_strategy(options) {
        //       if (options.error && options.error.code === 'ECONNREFUSED') {
        //         return new Error('The server refused the connection');
        //       }
        //       if (options.total_retry_time > 1000 * 60 * 60) {
        //         return new Error('Retry time exhausted');
        //       }
        //       if (options.times_connected > 10) {
        //         return undefined;
        //       }
        //       return Math.max(options.attempt * 100, 3000);
        //     },
        // });

        this.subscriber.subscribe(CHANNELS.TEST);

        this.subscriber.on(
            'message',
            (channel, message) => this.handleMessage(channel, message));
    }

    handleMessage(channel, message){
        console.log('primio sam poruku');
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
    }
}
console.log('pocinjemo');
const testPubSub = new PubSub();
console.log('nastavljamo');
console.log(testPubSub.publisher.connected);
setTimeout(() => testPubSub.publisher.publish(CHANNELS.TEST, 'foo'), 10000);
console.log('poslao sam');
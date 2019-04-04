const shortid = require('shortid');
const _ = require('lodash');
const redisClient = require('../redisClient');

function Messages() {
    this.client = redisClient.getClient()
}

module.exports = new Messages();

Messages.prototype.upsert = function ( { aliciId, userId, message, username } ) {
    this.client.hset(
        'messages:'+aliciId,
        shortid.generate(),
        JSON.stringify({
            userId,
            username,
            message,
            when: Date.now()
        }),
        err => {
            if (err) {
                console.error(err);
            }
        }
    )
};
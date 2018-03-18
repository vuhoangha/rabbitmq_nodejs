#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'topic_logs';

amqp.connect('amqp://guest:guest@192.168.99.100:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'topic', { durable: false });

        const key = process.argv[2];
        const msg = `Hello World ${key}`;
        ch.publish(EXCHANGE, key, new Buffer(msg));
        console.log(" [x] Sent %s:'%s'", key, msg);
    });

    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});
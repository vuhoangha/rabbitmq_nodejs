#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'logs';

amqp.connect('amqp://guest:guest@192.168.99.100:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'fanout', { durable: false });

        const send = time => {
            const msg = new Date().toISOString();
            ch.publish(EXCHANGE, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);
            setTimeout(() => {
                send(time);
            }, time);
        };

        send(10000);
    });

    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'fanout', { durable: false });

        const send = time => {
            const msg = new Date().toISOString();
            ch.publish(EXCHANGE, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);
            setTimeout(() => {
                send(time);
            }, time);
        };

        send(10000);
    });
});
#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'direct_logs';

amqp.connect('amqp://guest:guest@192.168.99.100:5672', (err, conn) => {
    conn.createChannel((err, ch) => {
        ch.assertExchange(EXCHANGE, 'direct', { durable: false });

        const send = time => {
            console.log("\n\n");
            const msg = new Date().toISOString();

            ch.publish(EXCHANGE, 'info', new Buffer(msg));
            console.log(" [x] Sent %s: '%s'", 'info', msg);

            ch.publish(EXCHANGE, 'warning', new Buffer(msg));
            console.log(" [x] Sent %s: '%s'", 'warning', msg);

            ch.publish(EXCHANGE, 'error', new Buffer(msg));
            console.log(" [x] Sent %s: '%s'", 'error', msg);

            setTimeout(() => {
                send(time);
            }, time);
        };

        send(1000);
    });
});
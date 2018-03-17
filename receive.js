#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'direct_logs';

const severity = process.argv[2];

amqp.connect('amqp://guest:guest@192.168.99.100:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'direct', { durable: false });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
            ch.bindQueue(q.queue, EXCHANGE, severity);

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            }, { noAck: true });
        });
    });
});
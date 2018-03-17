#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'logs';

amqp.connect('amqp://guest:guest@192.168.99.100:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'fanout', { durable: false });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, EXCHANGE, '');

            ch.consume(q.queue, function (msg) {
                console.log("1_ [x] %s", msg.content.toString());
            }, { noAck: true });
        });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, EXCHANGE, '');

            ch.consume(q.queue, function (msg) {
                console.log("2_ [x] %s", msg.content.toString());
            }, { noAck: true });
        });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            ch.bindQueue(q.queue, EXCHANGE, '');

            ch.consume(q.queue, function (msg) {
                console.log("3_ [x] %s", msg.content.toString());
            }, { noAck: true });
        });
    });
});
#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const EXCHANGE = 'topic_logs';

amqp.connect('amqp://guest:guest@192.168.99.100:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertExchange(EXCHANGE, 'topic', { durable: false });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
            ch.bindQueue(q.queue, EXCHANGE, "hadang.*");

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s:'%s'", "hadang.*", msg.content.toString());
            }, { noAck: true });
        });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
            ch.bindQueue(q.queue, EXCHANGE, "*.info");

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s:'%s'", "*.info", msg.content.toString());
            }, { noAck: true });
        });

        ch.assertQueue('', { exclusive: true }, function (err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');
            ch.bindQueue(q.queue, EXCHANGE, "havu.warn*");

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s:'%s'", "havu.warn*", msg.content.toString());
            }, { noAck: true });
        });
    });
});
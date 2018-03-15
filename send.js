const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@192.168.99.100:5672', (errr, conn) => {
    conn.createChannel((err, ch) => {
        if (err) {
            console.log('error connection');
        }

        const queueName = 'havu2';
        ch.assertQueue(queueName, { durable: false });

        ch.sendToQueue(queueName, new Buffer('Mess 1'), { persistent: true });
        console.log(' [x] Sent %s', 'Mess 1');

        ch.sendToQueue(queueName, new Buffer('Mess 2'), { persistent: true });
        console.log(' [x] Sent %s', 'Mess 2');
    });
});

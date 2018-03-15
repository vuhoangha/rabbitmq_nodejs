
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@192.168.99.100:5672', (errr, conn) => {
    conn.createChannel((err, ch) => {
        if (err) console.log('loi he thong', err);

        const queueName = 'hello';
        ch.assertQueue(queueName, { durable: false });
        ch.consume(queueName, msg => {
            console.log(' [x] Received %s', msg.content.toString());
        }, { noAck: true });
    });
});

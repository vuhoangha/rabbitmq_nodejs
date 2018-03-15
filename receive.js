
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@192.168.99.100:5672', (errr, conn) => {
    conn.createChannel((err, ch) => {
        if (err) console.log('loi he thong', err);

        const queueName = 'havu2';
        ch.assertQueue(queueName, { durable: false });
        ch.consume(queueName, msg => {
            console.log(' [x] Received %s', msg.content.toString());
            setTimeout(() => {
                console.log(' [x] Done %s', msg.content.toString());
                ch.ack(msg);
            }, 5000);
        }, { noAck: false });
    });
});

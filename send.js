const amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@192.168.99.100:5672', (errr, conn) => {
    conn.createChannel((err, ch) => {
        if (err) {
            console.log('error connection');
        }

        const queueName = 'hello';
        ch.assertQueue(queueName, { durable: false });

        /**
         * send
         * @param {any} time time
         */
        const send = time => {
            const msg = new Date().getTime().toString();
            ch.sendToQueue(queueName, new Buffer(msg));
            console.log(' [x] Sent %s', msg);

            setTimeout(() => {
                send(time);
            }, time);
        };
        send(1000);
    });
});


    - tạo ra một queue mới, nếu durable = true thì queue này ko ai được phép tạo trùng,
      nếu durable = false thì có thể tạo trùng
            VD: ch.assertQueue(queueName, { durable: false });

    - gửi lại message nếu worker bị dừng đột ngột
      nếu noAck: false là sẽ gửi lại với hàm ch.ack(msg); khi một worker bị tắt và các message đang xử lý dở
      các message này sẽ được gửi sang các worker khác để xử lý lại
      nếu noAck: true thì worker bị tắt đồng nghĩa với mất dữ liệu
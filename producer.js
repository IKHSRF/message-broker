const amqp = require("amqplib"); // Import library amqp

amqp
  .connect("amqp://localhost")
  .then(conn => {
    return conn
      .createChannel()
      .then(ch => {
        const msg = "Selamat Pagi"; // Isi pesan yang dikirim ke RabbitMQ
        const array = {
          name: "Kiddy",
          job: "Programmer",
          hobby: "Fishing"
        };

        // Memanggil kurir 'queue1'
        const queue1 = ch.assertQueue("queue1", { durable: false });

        // Mengirim pesan ke kurir 'queue1'
        ch.sendToQueue("queue1", Buffer.from(msg));
        console.log("- Sent", msg);

        // Memanggil kurir 'queue2'
        const queue2 = ch.assertQueue("queue2", { durable: false });

        // Mengirim pesan ke kurir 'queue2'
        ch.sendToQueue("queue2", Buffer.from(JSON.stringify(array)));
        console.log("- Sent", array);
      })
      .finally(() => {
        //Tutup koneksi ke RabbitMQ setelah selesai menggunakan.
        setTimeout(function() {
          conn.close();
        }, 500);
      });
  })
  .catch(console.warn);

import asyncHandler from '../middlewares/asyncHandler.js'
import amqp from "amqplib";

const summarize = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(403).json({ message: "File Not Found", success: false });
  }

  const textData = file.buffer.toString();

  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "summarize_queue";

  await channel.assertQueue(queue, { durable: true });

  const job = {
    text: textData,
    email: req.body.email,
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(job)), {
    persistent: true,
  });

  console.log("Job sent to queue !");

  res.status(200).json({
    success: true,
    message: "File submitted for summarization.",
  });
});


export {summarize}
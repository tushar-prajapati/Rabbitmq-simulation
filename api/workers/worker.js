import amqp from "amqplib";
import { GoogleGenAI } from "@google/genai";
import nodemailer from 'nodemailer'

const runWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "summarize_queue";

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1); 

  console.log(" [*] Waiting for messages in %s", queue);

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const job = JSON.parse(msg.content.toString());
    //   console.log(" [x] Received job:", job);

      try {
        const ai = new GoogleGenAI({});
        const prompt = `Summarize the following text in a concise paragraph:\n\n${job.text}`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const summary = response.text;

        const transporter = nodemailer.createTransport({
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: job.email,
            subject: "Summary of Document",
            text: `Your Document Summary is: \n\n ${summary}`,
          });

        console.log("Summary generated and email sent!");

        channel.ack(msg);
      } catch (err) {
        console.error("Error processing job:", err);
        channel.nack(msg, false, true);
      }
    }
  });
};

export default runWorker;
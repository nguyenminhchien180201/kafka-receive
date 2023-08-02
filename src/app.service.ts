// service-b/src/app.service.ts
import { Injectable } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AppService {
  private kafkaConsumer: Consumer;

  constructor() {
    this.kafkaConsumer = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: [process.env.KAFKA_BROKER],
    }).consumer({ groupId: 'serviceB-group' });
  }

  async consumeMessages(): Promise<void> {
    console.log(0);
    console.log(this.kafkaConsumer);

    if (this.kafkaConsumer) {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });
      console.log(4);

      await this.kafkaConsumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          const messageValue = payload.message.value.toString();
          console.log(`Received message from topic ${process.env.KAFKA_TOPIC}: ${messageValue}`);
          // Process the message as needed
        },
      });
    }
    // console.log(4);

    // await this.kafkaConsumer.connect();
    // await this.kafkaConsumer.subscribe({ topics: [process.env.KAFKA_TOPIC], fromBeginning: true });
    // console.log(0);

    // await this.kafkaConsumer.run({
    //   eachMessage: async (messagePayload: any) => {
    //     const { topic, message } = messagePayload;
    //     let payload: any = JSON.parse(message.value.toString());

    //     console.log('🚀 ~ topic:', topic);
    //     console.log('🚀 ~ payload:', payload);
    //     console.log(`Received message from ${topic}: ${message.value}`);
    //   },
    // });
    // console.log(12);

  }
}

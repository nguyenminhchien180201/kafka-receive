// import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { Consumer, ConsumerSubscribeTopics, Kafka } from 'kafkajs';


// @Injectable()
// export default class KafkaConsumer implements OnModuleInit, OnModuleDestroy {
//   private kafkaConsumer: Consumer;
//   async onModuleInit() {
//     try {
//       this.kafkaConsumer = this.createKafkaConsumer();
//       await this.startConsumer();
//     } catch (error) {
//         console.log(error);
        
//     }
//   }

//   async onModuleDestroy() {
//     await this.shutdown();
//   }

//   public async startConsumer(): Promise<void> {
//     const topic: ConsumerSubscribeTopics = {
//       topics: [
//         // TOPICS.PINNED_MESSAGE,
//         // TOPICS.MESSAGE_TEXT,
//         // TOPICS.CHAT_MESSAGE,
//         // TOPICS.REVOKE_MESSAGE,
//         // TOPICS.REACTION_MESSAGE,
//         // TOPICS.MESSAGE_VOTE_PINNED,
//         // TOPICS.REMOVE_MESSAGE_VOTE_PINNED,
//       ],
//       fromBeginning: true,
//     };

//     try {
//       await this.kafkaConsumer.connect();
//       await this.kafkaConsumer.subscribe(topic);

//       await this.kafkaConsumer.run({
//         eachMessage: async (messagePayload: any) => {
//           const { topic, message } = messagePayload;
//           let payload: any = JSON.parse(message.value.toString());

//           console.log('🚀 ~ topic:', topic);
//           console.log('🚀 ~ payload:', payload);

//           switch (topic) {
//             case TOPICS.MESSAGE_TEXT:
//               await this.messageService.handleMessageText(payload);
//               break;

//             case TOPICS.CHAT_MESSAGE:
//               await this.kafkaService.createMessage(payload);
//               break;
//             case TOPICS.REVOKE_MESSAGE:
//               await this.kafkaService.updateMessageRevoke(payload);
//               break;
//             case TOPICS.REACTION_MESSAGE:
//               await this.kafkaService.updateReactionMessage(payload);
//               break;
//             case TOPICS.PINNED_MESSAGE:
//               await this.kafkaService.pinnedMessage(payload);
//               break;
//             case TOPICS.MESSAGE_VOTE_PINNED:
//               await this.kafkaService.pinnedMessageVote(payload);
//               break;
//             case TOPICS.REMOVE_MESSAGE_VOTE_PINNED:
//               await this.kafkaService.removePinnedMessageVote(payload);
//               break;
//             default:
//               console.log('default!');
//               break;
//           }
//         },
//       });
//     } catch (error) {
//       this.logger.error(error);
//     }
//   }

//   public async shutdown(): Promise<void> {
//     await this.kafkaConsumer.disconnect();
//   }

//   private createKafkaConsumer(): Consumer {
//     const kafka = new Kafka({
//       clientId: process.env.CONFIG_KAFKA_CLIENT_ID,
//       brokers: [`${process.env.CONFIG_KAFKA_HOST}:${process.env.CONFIG_KAFKA_PORT}`],
//     });
//     return kafka.consumer({ groupId: process.env.CONFIG_KAFKA_GROUP_ID, readUncommitted: true });
//   }
// }

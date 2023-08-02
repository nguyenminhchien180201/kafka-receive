// service-b/src/app/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async consumeMessage(): Promise<string> {
    await this.appService.consumeMessages();
    return 'Consuming messages from Kafka';
  }
}

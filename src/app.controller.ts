import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    try {
      this.logger.log('calling hello world', AppController.name);
      return this.appService.getHello();
    } catch (e) {
      this.logger.error('calling hello', e.stack, AppController.name);
    }
  }
}

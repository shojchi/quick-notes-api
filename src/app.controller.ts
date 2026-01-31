import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // GET /
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('goodbye') // GET /goodbye ✅ Unique route!
  getGoodbye(): string {
    return 'Goodbye World!';
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async helloWorld(): Promise<string> {
    return `Hello World!`;
  }
}

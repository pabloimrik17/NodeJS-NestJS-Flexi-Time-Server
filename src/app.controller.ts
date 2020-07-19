import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Default')
@Controller()
export class AppController {
  @Get()
  async helloWorld(): Promise<string> {
    return 'Hello World!!';
  }
}

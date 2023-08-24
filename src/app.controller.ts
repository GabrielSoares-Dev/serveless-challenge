import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  home() {
    return {
      statusCode: 200,
      message: 'Server is running',
    };
  }
}

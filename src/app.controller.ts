import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  health() {
    return {
      statusCode: 200,
      message: 'Server is running',
    };
  }
}

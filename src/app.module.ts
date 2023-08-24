import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EmployeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

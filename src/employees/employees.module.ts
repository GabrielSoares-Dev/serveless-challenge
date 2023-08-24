import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { CreateEmployeeUseCase } from '@application/create-employee.use-case';
import { UpdateEmployeeUseCase } from '@application/update-employee.use-case';
import { DeleteEmployeeUseCase } from '@application/delete-employee.use-case';
import { FindEmployeeUseCase } from '@application/find-employee.use-case';
import { FindAllEmployeeUseCase } from '@application/find-all-employees.use-case';
import { DynamoDBEmployeeRepository } from '@infra/db/dynamodb/employee.repository';
import type { EmployeeRepositoryInterface } from '@domain/employee.repository';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    {
      provide: DynamoDBEmployeeRepository,
      useFactory: () => {
        return new DynamoDBEmployeeRepository();
      },
    },
    {
      provide: CreateEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new CreateEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
    {
      provide: FindEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new FindEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
    {
      provide: FindAllEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new FindAllEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
    {
      provide: UpdateEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new UpdateEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
    {
      provide: DeleteEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new DeleteEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
    {
      provide: DeleteEmployeeUseCase,
      useFactory: (employeeRepository: EmployeeRepositoryInterface) => {
        return new DeleteEmployeeUseCase(employeeRepository);
      },
      inject: [DynamoDBEmployeeRepository],
    },
  ],
})
export class EmployeesModule {}

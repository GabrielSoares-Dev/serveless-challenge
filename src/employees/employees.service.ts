import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common';
import { CreateEmployeeUseCase } from '@application/create-employee.use-case';
import { UpdateEmployeeUseCase } from '@application/update-employee.use-case';
import { DeleteEmployeeUseCase } from '@application/delete-employee.use-case';
import { FindEmployeeUseCase } from '@application/find-employee.use-case';
import { FindAllEmployeeUseCase } from '@application/find-all-employees.use-case';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly findEmployeeUseCase: FindEmployeeUseCase,
    private readonly findAllEmployeeUseCase: FindAllEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
  ) {}
  async create({ name, age, role }: CreateEmployeeDto) {
    try {
      const employee = {
        name,
        age,
        role,
      };

      const created = await this.createEmployeeUseCase.execute(employee);

      return created;
    } catch (error) {
      throw new HttpException(
        'Error when try created employee',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const employees = await this.findAllEmployeeUseCase.execute();
      return employees;
    } catch (error) {
      throw new HttpException(
        'Error when try found employees',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(id: string) {
    try {
      const employee = await this.findEmployeeUseCase.execute(id);

      return employee;
    } catch (error) {
      throw new HttpException(
        'Error when try found employee',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, UpdateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employeeUpdated = await this.updateEmployeeUseCase.execute(
        id,
        UpdateEmployeeDto,
      );

      return employeeUpdated;
    } catch (error) {
      throw new HttpException('Employee not found', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.deleteEmployeeUseCase.execute(id);

      return deleted;
    } catch (error) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { Response } from 'express';

@Controller('/v1/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    await this.employeesService.create(createEmployeeDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ statusCode: 201, message: 'Employee created' });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const employees = await this.employeesService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Employees found',
      content: employees,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const employee = await this.employeesService.findOne(id);
    const notFound = employee === undefined;

    if (notFound) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Employee found',
      content: employee,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Res() res: Response,
  ) {
    await this.employeesService.update(id, updateEmployeeDto);
    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Employee updated',
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.employeesService.remove(id);

    return res.status(HttpStatus.OK).json({
      statusCode: 200,
      message: 'Employee deleted',
    });
  }
}

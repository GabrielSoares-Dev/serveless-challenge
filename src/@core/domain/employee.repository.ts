import { Employee } from './employee.entity';
import type {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '@domain/employee.dto';

export interface EmployeeRepositoryInterface {
  create(employee: CreateEmployeeDto);
  findAll(): Promise<Employee[]>;
  findOne(id: string): Promise<Employee | undefined>;
  update(id: string, employee: UpdateEmployeeDto): Promise<boolean>;
  remove(id: string): Promise<boolean>;
}

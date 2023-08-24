import type { EmployeeRepositoryInterface } from '@domain/employee.repository';
import type { CreateEmployeeDto } from '@domain/employee.dto';

export class CreateEmployeeUseCase {
  constructor(private employeesRepository: EmployeeRepositoryInterface) {}

  async execute(employeeData: CreateEmployeeDto): Promise<void> {
    return await this.employeesRepository.create(employeeData);
  }
}

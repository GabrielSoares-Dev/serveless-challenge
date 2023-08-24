import type { EmployeeRepositoryInterface } from '@domain/employee.repository';
import type { Employee } from '@domain/employee.entity';

export class FindAllEmployeeUseCase {
  constructor(private employeesRepository: EmployeeRepositoryInterface) {}

  async execute(): Promise<Employee[]> {
    return await this.employeesRepository.findAll();
  }
}

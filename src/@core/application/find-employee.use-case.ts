import type { EmployeeRepositoryInterface } from '@domain/employee.repository';
import type { Employee } from '@domain/employee.entity';

export class FindEmployeeUseCase {
  constructor(private employeesRepository: EmployeeRepositoryInterface) {}

  async execute(id: string): Promise<Employee | undefined> {
    return await this.employeesRepository.findOne(id);
  }
}

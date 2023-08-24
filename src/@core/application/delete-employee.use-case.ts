import type { EmployeeRepositoryInterface } from '@domain/employee.repository';

export class DeleteEmployeeUseCase {
  constructor(private employeesRepository: EmployeeRepositoryInterface) {}

  async execute(id: string): Promise<boolean> {
    return await this.employeesRepository.remove(id);
  }
}

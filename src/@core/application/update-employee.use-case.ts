import type { EmployeeRepositoryInterface } from '@domain/employee.repository';
import type { UpdateEmployeeDto } from '@domain/employee.dto';

export class UpdateEmployeeUseCase {
  constructor(private employeesRepository: EmployeeRepositoryInterface) {}

  async execute(id: string, employee: UpdateEmployeeDto): Promise<boolean> {
    return await this.employeesRepository.update(id, employee);
  }
}

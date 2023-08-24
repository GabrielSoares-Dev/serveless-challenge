import { FindEmployeeUseCase } from './find-employee.use-case';
import { Employee } from '@domain/employee.entity';

describe('FindEmployeeUseCase', () => {
  it('Should return an employee when found', async () => {
    const mockEmployee: Employee = {
      id: '1',
      name: 'John Doe',
      age: 30,
      role: 'Developer',
    };
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue(true),
      findOne: jest.fn().mockResolvedValue(mockEmployee),
    };

    const findEmployeeUseCase = new FindEmployeeUseCase(mockEmployeeRepository);

    const employeeId = '1';
    const result = await findEmployeeUseCase.execute(employeeId);

    expect(mockEmployeeRepository.findOne).toHaveBeenCalledWith(employeeId);
    expect(result).toEqual(mockEmployee);
  });

  it('Should return undefined when employee is not found', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue(true),
      findOne: jest.fn().mockResolvedValue(undefined),
    };

    const findEmployeeUseCase = new FindEmployeeUseCase(mockEmployeeRepository);

    const employeeId = 'non-existent-id';
    const result = await findEmployeeUseCase.execute(employeeId);

    expect(mockEmployeeRepository.findOne).toHaveBeenCalledWith(employeeId);
    expect(result).toBeUndefined();
  });
});

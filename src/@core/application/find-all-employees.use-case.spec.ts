import { FindAllEmployeeUseCase } from './find-all-employees.use-case';
import { Employee } from '@domain/employee.entity';

describe('FindAllEmployeeUseCase', () => {
  it('Should return a list of employees', async () => {
    const mockEmployees: Employee[] = [
      { id: '1', name: 'John Doe', age: 30, role: 'Developer' },
      { id: '2', name: 'Jane Smith', age: 28, role: 'Designer' },
    ];
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn().mockResolvedValue(mockEmployees),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const findAllEmployeeUseCase = new FindAllEmployeeUseCase(
      mockEmployeeRepository,
    );

    const result = await findAllEmployeeUseCase.execute();

    expect(mockEmployeeRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockEmployees);
  });

  it('Should return an empty list if no employees are found', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn().mockResolvedValue([]),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const findAllEmployeeUseCase = new FindAllEmployeeUseCase(
      mockEmployeeRepository,
    );

    const result = await findAllEmployeeUseCase.execute();

    expect(mockEmployeeRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});

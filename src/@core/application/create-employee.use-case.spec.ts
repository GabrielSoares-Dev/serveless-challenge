import { CreateEmployeeUseCase } from './create-employee.use-case';

describe('CreateEmployeeUseCase', () => {
  it('Should create a new employee', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const createEmployeeUseCase = new CreateEmployeeUseCase(
      mockEmployeeRepository,
    );

    const employeeData = {
      name: 'John Doe',
      age: 30,
      role: 'Developer',
    };

    await createEmployeeUseCase.execute(employeeData);

    expect(mockEmployeeRepository.create).toHaveBeenCalledWith(employeeData);
  });
});

import { DeleteEmployeeUseCase } from './delete-employee.use-case';

describe('DeleteEmployeeUseCase', () => {
  it('Should delete an employee', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue(true),
    };

    const deleteEmployeeUseCase = new DeleteEmployeeUseCase(
      mockEmployeeRepository,
    );

    const employeeId = 'some-id';

    const result = await deleteEmployeeUseCase.execute(employeeId);

    expect(mockEmployeeRepository.remove).toHaveBeenCalledWith(employeeId);

    expect(result).toBe(true);
  });

  it('Should return false if employee does not exist', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn().mockResolvedValue(false),
    };

    const deleteEmployeeUseCase = new DeleteEmployeeUseCase(
      mockEmployeeRepository,
    );

    const employeeId = 'non-existent-id';

    const result = await deleteEmployeeUseCase.execute(employeeId);

    expect(mockEmployeeRepository.remove).toHaveBeenCalledWith(employeeId);
    expect(result).toBe(false);
  });
});

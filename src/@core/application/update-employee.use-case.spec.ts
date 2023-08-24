import { UpdateEmployeeUseCase } from './update-employee.use-case';

describe('UpdateEmployeeUseCase', () => {
  it('Should update an existing employee', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn().mockResolvedValue(true),
      remove: jest.fn(),
      findOne: jest.fn(),
    };

    const updateEmployeeUseCase = new UpdateEmployeeUseCase(
      mockEmployeeRepository,
    );

    const employeeId = 'existing-id';
    const updateData = {
      name: 'Updated Name',
      age: 31,
      role: 'Senior Developer',
    };

    const result = await updateEmployeeUseCase.execute(employeeId, updateData);

    expect(mockEmployeeRepository.update).toHaveBeenCalledWith(
      employeeId,
      updateData,
    );
    expect(result).toBe(true);
  });

  it('Should throw an error when employee is not found', async () => {
    const mockEmployeeRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn().mockRejectedValue(new Error('Employee not found')),
      remove: jest.fn(),
      findOne: jest.fn(),
    };

    const updateEmployeeUseCase = new UpdateEmployeeUseCase(
      mockEmployeeRepository,
    );

    const employeeId = 'non-existent-id';
    const updateData = {
      name: 'Updated Name',
      age: 31,
      role: 'Senior Developer',
    };

    await expect(
      updateEmployeeUseCase.execute(employeeId, updateData),
    ).rejects.toThrow('Employee not found');

    expect(mockEmployeeRepository.update).toHaveBeenCalledWith(
      employeeId,
      updateData,
    );
  });
});

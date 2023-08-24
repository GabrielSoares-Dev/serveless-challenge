import { DynamoDBEmployeeRepository } from './employee.repository';

const mockPutItem = jest.fn();
const mockScan = jest.fn();
const mockQuery = jest.fn();
const mockDeleteItem = jest.fn();

jest.mock('aws-sdk', () => ({
  DynamoDB: jest.fn(() => ({
    putItem: mockPutItem,
    scan: mockScan,
    query: mockQuery,
    deleteItem: mockDeleteItem,
  })),
}));

describe('DynamoDBEmployeeRepository', () => {
  let repository: DynamoDBEmployeeRepository;

  beforeEach(() => {
    repository = new DynamoDBEmployeeRepository();
    mockPutItem.mockClear();
    mockScan.mockClear();
    mockQuery.mockClear();
    mockDeleteItem.mockClear();
  });

  describe('Create', () => {
    it('should create a new employee', async () => {
      mockPutItem.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

      const result = await repository.create({
        name: 'John Doe',
        age: 30,
        role: 'Developer',
      });

      expect(result).toEqual({});
      expect(mockPutItem).toHaveBeenCalledTimes(1);
    });
  });
  describe('FindOne', () => {
    it('Should find an employee by ID', async () => {
      const mockEmployee = {
        id: 'some-id',
        name: 'John Doe',
        age: 30,
        role: 'Developer',
      };

      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [mockEmployee] }),
      });

      const result = await repository.findOne('some-id');

      expect(result).toEqual(mockEmployee);
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });
    it('Should return undefined if employee is not found', async () => {
      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      const result = await repository.findOne('non-existent-id');

      expect(result).toBeUndefined();
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });
  });
  describe('Update', () => {
    it('Should update an existing employee', async () => {
      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [{ id: 'some-id' }] }),
      });
      mockPutItem.mockReturnValue({ promise: jest.fn().mockResolvedValue({}) });

      const result = await repository.update('some-id', {
        name: 'Updated Name',
        age: 31,
        role: 'Senior Developer',
      });

      expect(result).toBeTruthy();
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockPutItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAll', () => {
    it('Should find all employees', async () => {
      mockScan.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      const result = await repository.findAll();

      expect(result).toEqual([]);
      expect(mockScan).toHaveBeenCalledTimes(1);
    });
  });
  describe('Remove', () => {
    it('Should remove an existing employee', async () => {
      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [{ id: 'some-id' }] }),
      });
      mockDeleteItem.mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      });

      const result = await repository.remove('some-id');

      expect(result).toBeTruthy();
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockDeleteItem).toHaveBeenCalledTimes(1);
    });
    it('Should throw an error if employee is not found', async () => {
      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      await expect(async () => {
        await repository.update('non-existent-id', {
          name: 'Updated Name',
          age: 31,
          role: 'Senior Developer',
        });
      }).rejects.toThrow('Employee not found');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockPutItem).not.toHaveBeenCalled();
    });
    it('Should throw an error if employee is not found', async () => {
      mockQuery.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      await expect(async () => {
        await repository.remove('non-existent-id');
      }).rejects.toThrow('Employee not found');

      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockDeleteItem).not.toHaveBeenCalled();
    });
  });
});

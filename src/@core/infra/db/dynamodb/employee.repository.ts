import { DynamoDB } from 'aws-sdk';
import { randomUUID } from 'node:crypto';
import type { Employee } from '@domain/employee.entity';
import type {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '@domain/employee.dto';
import type { EmployeeRepositoryInterface } from '@domain/employee.repository';

export class DynamoDBEmployeeRepository implements EmployeeRepositoryInterface {
  private readonly dynamoDbClient: DynamoDB;
  private tableName: string;

  constructor() {
    this.dynamoDbClient = new DynamoDB({ region: process.env.AWS_REGION });
    this.tableName = process.env.EMPLOYEES_TABLE;
  }

  async create({ name, age, role }: CreateEmployeeDto) {
    const employee = {
      id: { S: randomUUID() },
      name: { S: name },
      age: { N: age.toString() },
      role: { S: role },
    };

    const params = {
      TableName: this.tableName,
      Item: employee,
    };

    const created = await this.dynamoDbClient.putItem(params).promise();

    return created;
  }

  async findAll(): Promise<Employee[]> {
    const params = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDbClient.scan(params).promise();
    return result.Items.map((item) => ({
      id: item.id.S,
      role: item.role.S,
      name: item.name.S,
      age: parseInt(item.age.N),
    })) as unknown as Employee[];
  }

  async findOne(id: string): Promise<Employee | undefined> {
    const params = {
      TableName: this.tableName,
      ExpressionAttributeValues: {
        ':id': {
          S: id,
        },
      },
      KeyConditionExpression: 'id = :id',
      Limit: 1,
    };

    const result = await this.dynamoDbClient.query(params).promise();

    const notFound = result.Items.length === 0;

    if (!notFound) {
      const employee = {
        id: result.Items[0].id.S,
        role: result.Items[0].role.S,
        name: result.Items[0].name.S,
        age: parseInt(result.Items[0].age.N),
      };
      return employee as unknown as Employee | undefined;
    }
    if (notFound) {
      return undefined;
    }
  }

  async update(
    id: string,
    { name, age, role }: UpdateEmployeeDto,
  ): Promise<boolean> {
    const employee = {
      id: { S: id },
      name: { S: name },
      age: { N: age.toString() },
      role: { S: role },
    };

    const params = {
      TableName: this.tableName,
      Item: employee,
    };

    const employeeNotFound = (await this.findOne(id)) === undefined;
    if (employeeNotFound) {
      throw new Error('Employee not found');
    }
    const updated = await this.dynamoDbClient.putItem(params).promise();

    return !!updated;
  }

  async remove(id: string): Promise<boolean> {
    const params = {
      TableName: process.env.EMPLOYEES_TABLE,
      Key: {
        id: {
          S: id,
        },
      },
    };

    const employeeNotFound = (await this.findOne(id)) === undefined;
    if (employeeNotFound) {
      throw new Error('Employee not found');
    }
    const deleted = await this.dynamoDbClient.deleteItem(params).promise();

    return !!deleted;
  }
}

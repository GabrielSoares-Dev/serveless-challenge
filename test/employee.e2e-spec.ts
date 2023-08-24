import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { EmployeesModule } from '../src/employees/employees.module';
import { CreateEmployeeUseCase } from '@application/create-employee.use-case';
import { UpdateEmployeeUseCase } from '@application/update-employee.use-case';
import { DeleteEmployeeUseCase } from '@application/delete-employee.use-case';
import { FindEmployeeUseCase } from '@application/find-employee.use-case';
import { FindAllEmployeeUseCase } from '@application/find-all-employees.use-case';
import { EmployeesService } from 'src/employees/employees.service';
import * as request from 'supertest';

jest.mock('aws-sdk', () => {
  const dynamoDbMock = {
    createTable: jest.fn(),
    putItem: jest.fn(),
    getItem: jest.fn(),
    scan: jest.fn(),
  };

  return {
    DynamoDB: jest.fn(() => dynamoDbMock),
  };
});
describe('EmployeesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EmployeesModule],
    })
      .overrideProvider(CreateEmployeeUseCase)
      .useValue({ execute: jest.fn() })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/v1/employees (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/v1/employees')
      .send({
        name: 'John Doe',
        age: 30,
        role: 'Developer',
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      statusCode: 201,
      message: 'Employee created',
    });
  });

  it('/v1/employees (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/v1/employees')
      .expect(HttpStatus.OK);

    expect(response.body.statusCode).toBe(200);
    expect(response.body.content).toHaveLength(1);
  });
});

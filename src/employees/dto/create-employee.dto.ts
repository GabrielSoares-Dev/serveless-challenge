import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  role: string;
}

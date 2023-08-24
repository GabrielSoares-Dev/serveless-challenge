import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  role: string;
}

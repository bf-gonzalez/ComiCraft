// type, price, created_at, payment_date

import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Role } from 'src/enum/role.enum';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(Role)
  type: Role;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  payment_date: Date;
}

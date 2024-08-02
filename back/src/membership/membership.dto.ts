import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { MembershipType } from 'src/enum/membership-type.enum';
import { Role } from 'src/enum/role.enum';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsEnum(MembershipType)
  type: MembershipType;

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

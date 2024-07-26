import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { MembershipType } from 'src/enum/membership-type.enum';
import { Role } from 'src/enum/role.enum';

export class UserProfileDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsEnum(MembershipType)
  membershipType?: MembershipType;
}

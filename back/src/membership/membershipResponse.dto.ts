import { Expose, Type } from 'class-transformer';

class UserIdOnly {
  @Expose()
  id: string;
}

export class MembershipResponseDto {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  price: string;

  @Expose()
  created_at: Date;

  @Expose()
  expiration_date: Date;

  @Expose()
  payment_date: Date;

  @Expose()
  @Type(() => UserIdOnly)
  user: UserIdOnly;
}

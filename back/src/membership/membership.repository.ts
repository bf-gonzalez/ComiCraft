import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CreateMembershipDto } from './membership.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { MembershipType } from 'src/enum/membership-type.enum';

@Injectable()
export class MembershipsRepository {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>,
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Users)
    private readonly usersRepositorySave: Repository<Users>,
  ) {}

  async addMembership(createMembershipDto: CreateMembershipDto) {
    const { email, type, created_at, payment_date, price } =
      createMembershipDto;
    try {
      const user = await this.usersRepository.getUserByEmail(email);
      if (!user) {
        throw new NotFoundException('El usuario no está registrado');
      }

      let expiration_date: Date;
      switch (type) {
        case MembershipType.MonthlyMember:
          expiration_date = new Date(created_at);
          expiration_date.setMonth(expiration_date.getMonth() + 1);
          break;

        case MembershipType.AnnualMember:
          expiration_date = new Date(created_at);
          expiration_date.setFullYear(expiration_date.getFullYear() + 1);
          break;

        case MembershipType.Creator:
          expiration_date = new Date(created_at);
          expiration_date.setMonth(expiration_date.getMonth() + 2);
          break;
        default:
          throw new BadRequestException('Membresía no válida');
      }

      const newUserMembership = {
        type,
        created_at,
        payment_date,
        price,
        user,
        expiration_date,
      };
      console.log('newUser=', newUserMembership);

      const userMembership =
        await this.membershipsRepository.save(newUserMembership);
      console.log('membershipRepository=', userMembership);

      user.memberships = userMembership;
      await this.usersRepositorySave.save(user);

      return 'Membersía adquirida';
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async getMerberships() {
    const memberships = await this.membershipsRepository.find();
    return memberships;
  }
}

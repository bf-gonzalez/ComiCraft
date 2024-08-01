import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CreateMembershipDto } from './membership.dto';
import { Role } from 'src/enum/role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsRepository {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async addMembership(createMembershipDto: CreateMembershipDto) {
    console.log('membershipDto=', createMembershipDto);
    const { email, type, created_at, payment_date, price } =
      createMembershipDto;
    const user = await this.usersRepository.getUserByEmail(email);
    try {
      if (!user) {
        throw new NotFoundException('El usuario no está registrado');
      }
      const userId = user.id;
      const newUserMembership = {
        type,
        created_at,
        payment_date,
        price,
        user,
      };
      console.log('newUser=', newUserMembership);
      console.log('userId=', userId);
      if (type === Role.MonthlyMember) {
        return 'Membresía mensual adquirida';
      }
      if (type === Role.AnnualMember) return 'Membresía anual adquirida';
      if (type === Role.Creator) return 'Membresía de creador adquirida';
      const userMembership =
        await this.membershipsRepository.save(newUserMembership);
      console.log('membershipRepository=', userMembership);
      return userMembership;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  /*   updateMembership(id: string, updateMembership: any){
    const membership = this.membership.find(m => m.id === id);
    if(membership){
        Object.assign(membership, updateMembership);
    }
    return membership;
} */
}

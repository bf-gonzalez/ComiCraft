import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CreateMembershipDto, UpdateMembershipDto } from './membership.dto';
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
  private membershipsTypes(type: MembershipType, created_at: Date): Date {
    const expiration_date: Date = new Date(created_at);
    switch (type) {
      case MembershipType.MonthlyMember:
        expiration_date.setMonth(expiration_date.getMonth() + 1);
        break;
      case MembershipType.AnnualMember:
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        break;
      case MembershipType.Creator:
        expiration_date.setMonth(expiration_date.getMonth() + 2);
        break;
      default:
        throw new BadRequestException('Membresía no válida');
    }
    return expiration_date;
  }

  async addMembership(createMembershipDto: CreateMembershipDto) {
    const { email, type, created_at, payment_date, price } =
      createMembershipDto;
    try {
      const founduser = await this.usersRepository.getUserByEmail(email);
      if (!founduser) {
        throw new NotFoundException('El usuario no está registrado');
      }
      const { address, password, name, dob, phone, ...user } = founduser;
      const expiration_date = this.membershipsTypes(type, created_at);

      const newUserMembership = {
        type,
        created_at,
        payment_date,
        price,
        expiration_date,
        user,
      };
      console.log('newUser=', newUserMembership);

      const userMembership =
        await this.membershipsRepository.save(newUserMembership);
      console.log('membershipRepository=', userMembership);

      user.memberships = userMembership;
      await this.usersRepositorySave.save(user);

      return `Membresía adquirida, id ${userMembership.id}`;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async getMerberships() {
    try {
      const memberships = await this.membershipsRepository.find();
      return memberships;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async getMembershipById(id: string) {
    try {
      const membership = await this.membershipsRepository.findOneBy({ id });
      if (!membership) {
        throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
      }
      return membership;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async deletedMembership(id: string) {
    try {
      const membership = await this.membershipsRepository.findOneBy({ id });
      if (!membership) {
        throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
      }
      await this.membershipsRepository.delete(id);
      return 'Membersía eliminada con éxito';
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async updateMembership(id: string, updateMembershipDto: UpdateMembershipDto) {
    console.log('updateMembershipDTO=', updateMembershipDto);
    const { type, created_at } = updateMembershipDto;
    try {
      const foundMembership = await this.membershipsRepository.findOneBy({
        id,
      });
      if (!foundMembership) {
        throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
      }
      const expiration_date = this.membershipsTypes(type, created_at);
      const updatedMembership = await this.membershipsRepository
        .createQueryBuilder()
        .update(Membership)
        .set({
          type: updateMembershipDto.type,
          price: updateMembershipDto.price,
          created_at: updateMembershipDto.created_at,
          payment_date: updateMembershipDto.payment_date,
          expiration_date,
        })
        .where('id = :id', { id })
        .execute();
      if (!updatedMembership) {
        throw new BadRequestException(
          `No fue posible actualizar la membresía con el id ${id}`,
        );
      }
      return `Membersía actualizada con éxito`;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
    }
    throw new InternalServerErrorException();
  }
}

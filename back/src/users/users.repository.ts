import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { LoginUserDto } from './dto/users.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly mailerService: MailerService,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    try {
      const users = await this.usersRepository.find({
        take: limit,
        skip: skip,
      });
      if (users.length < 1) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar los usuarios');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          comics: true,
          memberships: true,
        },
      });
      if (!user) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  async getUserByName(name?: string) {
    try {
      if (!name) {
        throw new NotFoundException(`No se encontró el usuario ${name}`);
      }
      return await this.usersRepository.findOneBy({ name });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  async createUser(user: LoginUserDto) {
    try {
      const newUser = await this.usersRepository.save(user);
      await this.mailerService.sendMail(
        newUser.email,
        'bienvenido a nuestra aplicación',
        `hola ${newUser.name} gracias por registrarse`,
      );
      return newUser;
    } catch (error) {
      throw new BadRequestException('No se pudo registrar el Usuario');
    }
  }

  async updateUser(id: string, user: Users) {
    try {
      await this.usersRepository.update(id, user);
      const updateUser = await this.usersRepository.findOneBy({ id });
      if (!updateUser) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      return updateUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('No se pudo actualizar al usuario');
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await this.usersRepository.findOneBy({ id });
      if (!deletedUser) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      return deletedUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('No se pudo eliminar al usuario');
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  /* async addUser(user: Partial<Users>): Promise<Users> {
    try {
      const newUser = this.usersRepository.create(user);
      const savedUser = await this.usersRepository.save(newUser);
      const { id, ...rest } = savedUser;
      await this.mailerService.sendMail(
        savedUser.email,
        'bienvenido a nuestra aplicación',
        `hola ${savedUser.email} gracias por registrarse en nuestra aplicación`,
      );
      return { id, ...rest };
    } catch (error) {
      throw new BadRequestException('No se pudo registrar el Usuario');
    }
  } */
}

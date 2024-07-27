import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly mailerService: MailerService,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        comics: true,
        memberships: true,
      },
    });
    if (!user) return `No se encontro el usuario con id ${id}`;
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByName(name?: string) {
    if (!name) {
      return `El nombre ${name} no se encontro`;
    }
    return await this.usersRepository.findOneBy({ name });
  }

  async createUser(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    const { password, ...userNoPassword } = dbUser;

    await this.mailerService.sendMail(
      userNoPassword.email,
      'bienvenido a nuestra aplicación',
      `hola ${userNoPassword.name} gracias por registrarse en nuestra aplicación`,
    );

    return userNoPassword;
  }

  async updateUser(id: string, user: Users) {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async addUser(user: Partial<Users>): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(newUser);
    const { id, ...rest } = savedUser;
    await this.mailerService.sendMail(
      savedUser.email,
      'bienvenido a nuestra aplicación',
      `hola ${savedUser.email} gracias por registrarse en nuestra aplicación`,
    );
    return { id, ...rest };
  }
}

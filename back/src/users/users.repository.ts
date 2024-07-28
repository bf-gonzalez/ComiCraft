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
      '¡Bienvenido a ComiCraft!',
      `Hola ${userNoPassword.name}, gracias por registrarte en ComiCraft`,
      `
        <html>
        <head>
          <style>
            body {
              font-family: 'Comic Sans MS', 'Comic Sans', cursive;
              background-color: #f2f2f2;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #ffcc00;
              color: #333;
              text-align: center;
              padding: 20px 0;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
            }
            .content {
              padding: 20px;
              color: #333;
            }
            .content p {
              margin: 10px 0;
              line-height: 1.6;
            }
            .footer {
              text-align: center;
              padding: 10px 0;
              background-color: #ffcc00;
              color: #333;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
              font-size: 12px;
            }
            .footer p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a ComiCraft!</h1>
            </div>
            <div class="content">
              <p>Hola ${userNoPassword.name},</p>
              <p>¡Gracias por registrarte en ComiCraft! Estamos emocionados de tenerte con nosotros en esta aventura de cómics.</p>
              <p>En ComiCraft, podrás disfrutar de una amplia variedad de cómics y mangas. No dudes en explorar y descubrir nuevas historias.</p>
              <p>Además, te invitamos a crear tus propias historias y compartirlas con la comunidad. ¡Deja volar tu imaginación y conviértete en un creador de cómics!</p>
              <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Disfruta de la magia de los cómics!</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `
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

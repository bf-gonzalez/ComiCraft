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
    const newUser = await this.usersRepository.save(user);
    /* const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    const { password, ...userNoPassword } = dbUser;
 */
    await this.mailerService.sendMail(
      newUser.email,
      '¡Bienvenido a ComiCraft!',
      `Hola ${newUser.name}, gracias por registrarte en ComiCraft`,
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
            .contenedorimg {
              text-align: center;
              margin: 20px 0;
            }
            .contenedorimg img.batman {
              max-width: 100%;
              height: auto;
            }
            .botoncreador {
              background-color: #ffcc00;
              color: #333;
              border: none;
              border-radius: 8px;
              padding: 10px 20px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 10px;
            }
            .botoncreador:hover {
              background-color: #e6b800;
            } 
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Bienvenido a ComiCraft!</h1>
            </div>
            <div class="content">
              <p>Hola ${newUser.name},</p>
              <p>¡Gracias por registrarte en ComiCraft! Estamos emocionados de tenerte con nosotros en esta aventura de cómics.</p>
              <p>En ComiCraft, podrás disfrutar de una amplia variedad de cómics y mangas. No dudes en explorar y descubrir nuevas historias.</p>
              <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Disfruta de la magia de los cómics!</p>

              <div class= "contenedorimg">
                <p>Tambien queremos invitarte a que ¡TU!</p>
                <img  class = "batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1722142238/Group_4_1_lvwly7.png">
                <p>Te conviertas en el nuevo Autor estrella de comiCraft para que la gente conozca tus mejores historias </p>
                <button class="botoncreador" onclick="window.open('https://www.google.com', '_blank')">¡Ùnete!</button>
              </div>
            </div>
            <div class="footer">
              <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    );

    return newUser;
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

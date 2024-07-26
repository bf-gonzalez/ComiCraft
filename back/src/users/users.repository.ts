import { Injectable } from '@nestjs/common';
import { Users } from './users.interface';
import { MailerService } from 'src/mailer/mailer.service';

let users = [
  {
    id: 1,
    name: 'Carlos García',
    fechaDeCumpleaños: '1985-06-15',
    email: 'carlos.garcia@example.com',
    password: 'Carlos1234',
  },
  {
    id: 2,
    name: 'María López',
    fechaDeCumpleaños: '1990-12-20',
    email: 'maria.lopez@example.com',
    password: 'Maria5678',
  },
  {
    id: 3,
    name: 'Juan Pérez',
    fechaDeCumpleaños: '1988-03-10',
    email: 'juan.perez@example.com',
    password: 'Juan91011',
  },
  {
    id: 4,
    name: 'Ana Torres',
    fechaDeCumpleaños: '1992-07-25',
    email: 'ana.torres@example.com',
    password: 'Ana1213',
  },
  {
    id: 5,
    name: 'Luis Martínez',
    fechaDeCumpleaños: '1980-11-05',
    email: 'luis.martinez@example.com',
    password: 'Luis1415',
  },
  {
    id: 6,
    name: 'Elena Sánchez',
    fechaDeCumpleaños: '1995-09-30',
    email: 'elena.sanchez@example.com',
    password: 'Elena1617',
  },
  {
    id: 7,
    name: 'Miguel Fernández',
    fechaDeCumpleaños: '1983-04-18',
    email: 'miguel.fernandez@example.com',
    password: 'Miguel1819',
  },
  {
    id: 8,
    name: 'Lucía Ramírez',
    fechaDeCumpleaños: '1987-02-14',
    email: 'lucia.ramirez@example.com',
    password: 'Lucia2021',
  },
  {
    id: 9,
    name: 'Pablo Gómez',
    fechaDeCumpleaños: '1993-08-22',
    email: 'pablo.gomez@example.com',
    password: 'Pablo2223',
  },
  {
    id: 10,
    name: 'Laura Ruiz',
    fechaDeCumpleaños: '1989-05-28',
    email: 'laura.ruiz@example.com',
    password: 'Laura2425',
  },
];

@Injectable()
export class UsersRepository {
  constructor(private readonly mailerService: MailerService) {}
  async createUser(user: Users) {
    users.push(user);
    await this.mailerService.sendMail(
      user.email,
      'Bienvenido a nuesrta aplicación',
      `Hola ${user.name} bienvenido a nuestra aplicación`,
    );
    return user;
  }

  getUsers() {
    return users;
  }

  getUserById(id: number) {
    if (id > users.length) return `No se encontro usuaria por el id ${id}`;
    return users.find((user) => user.id === id);
  }

  getUserByName(name: string) {
    const findUser = users.find(
      (user) => user.name.toLowerCase() === name.toLowerCase(),
    );
    if (!findUser) {
      return `Usuario ${name} no encontrado`;
    } else {
      return findUser;
    }
  }

  deleteUser(id: number) {
    const initialLength = users.length;
    users = users.filter((user) => user.id !== id);
    if (users.length === initialLength) {
      return `Usuario con el id ${id} no encontrado`;
    } else {
      return `Usuario con el id ${id} eliminado con éxito`;
    }
  }
}

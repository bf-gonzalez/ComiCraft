import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.interface';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  addUser(user: Users) {
    return this.userRepository.createUser(user);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }

  getUserById(id: number) {
    return this.userRepository.getUserById(id);
  }

  getUserByName(name: string) {
    return this.userRepository.getUserByName(name);
  }

  deleteUser(id: number) {
    return this.userRepository.deleteUser(id);
  }
}

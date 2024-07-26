import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';


@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  createUser(user: any){
    return this.userRepository.createUser(user)
  }

  getUsers(page: number, limit: number) {
    return this.userRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.userRepository.getUserById(id);
  }

  getUserByName(name: string) {
    return this.userRepository.getUserByName(name);
  }

  updateUser(id: string, user: Users){
    return this.userRepository.updateUser(id, user)
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
  
}

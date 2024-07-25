import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: Users) {
    return this.usersService.addUser(user);
  }
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(Number(id));
  }

  @Get('/name/:name')
  getUserByName(@Param('name') name: string) {
    return this.usersService.getUserByName(name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}

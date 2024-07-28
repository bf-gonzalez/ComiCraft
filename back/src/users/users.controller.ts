import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsers } from './users.interface';
import { Users } from './users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post()
  createUser(@Body() user: IUsers) {
    return this.usersService.createUser(user);
  }

  @HttpCode(200)
  @Get()
  getUsers(
    @Query('name') name?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (name) {
      return this.usersService.getUserByName(name);
    }
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
  }

  @HttpCode(200)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @Get('/name/:name')
  getUserByName(@Param('name') name: string) {
    return this.usersService.getUserByName(name);
  }

  @HttpCode(200)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Users) {
    return this.usersService.updateUser(id, user);
  }
}

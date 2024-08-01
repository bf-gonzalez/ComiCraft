import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { ApiTags } from '@nestjs/swagger';
import { PasswordInterceptor } from 'src/interceptors/password.interceptor';
import { Role } from 'src/enum/role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @UseInterceptors(PasswordInterceptor)
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

  // @HttpCode(200)
  // @Get(':id')
  // @UseInterceptors(PasswordInterceptor)
  // getUserById(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.usersService.getUserById(id);
  // }

  @HttpCode(200)
  @UseInterceptors(PasswordInterceptor)
  @Get('/name/:name')
  getUserByName(@Param('name') name: string) {
    return this.usersService.getUserByName(name);
  }

  @HttpCode(200)
  @UseInterceptors(PasswordInterceptor)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @HttpCode(201)
  @UseInterceptors(PasswordInterceptor)
  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Users) {
    return this.usersService.updateUser(id, user);
  }

  @HttpCode(200)
  @UseInterceptors(PasswordInterceptor)
  @Put(':id/role')
  updateUserRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('role') role: Role,
  ) {
    return this.usersService.updateUserRole(id, [role]);
  }
}
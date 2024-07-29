import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordInterceptor } from '../interceptors/password.interceptor';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(PasswordInterceptor)
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }
}
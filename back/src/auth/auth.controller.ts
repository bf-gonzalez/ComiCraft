import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';
import { PasswordInterceptor } from 'src/interceptors/password.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /* @Get()
  getAuth() {
    return 'auth';
  } */

  @Post('signin')
  @HttpCode(201)
  signin(@Body() credentials: CreateUserDto) {
    const { password, email } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  @HttpCode(201)
  @UseInterceptors(PasswordInterceptor)
  signUp(@Body() user: LoginUserDto) {
    return this.authService.signUp(user);
  }
}

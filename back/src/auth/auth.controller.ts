import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth() {
    return 'auth';
  }

  @Post('signin')
  signin(@Body() credentials: CreateUserDto) {
    const { password, email } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: LoginUserDto) { 
    return this.authService.signUp(user);
  }
}
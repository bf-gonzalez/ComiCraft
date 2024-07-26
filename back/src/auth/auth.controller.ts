import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAuth() {
    return 'auth';
  }

  @Post('signin')
  signin(@Body() credentials: any) {//! CAMBIAR
    const { password, email } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('signup')
  signUp(@Body() user: any) { //! CAMBIAR
    return this.authService.signUp(user);
  }
}
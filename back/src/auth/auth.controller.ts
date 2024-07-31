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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(201)
  signin(@Body() credentials: LoginUserDto) {
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

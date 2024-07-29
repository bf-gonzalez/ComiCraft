import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    try {
      if (!loginUserDto.email || !loginUserDto.password)
        throw new BadRequestException('Email y password requeridos');

      const user = await this.usersRepository.getUserByEmail(loginUserDto.email);
      if (!user) throw new BadRequestException('Credenciales incorrectas');

      const validPassword = await bcrypt.compare(loginUserDto.password, user.password);
      if (!validPassword)
        throw new BadRequestException('Credenciales incorrectas');
      const payload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Usuario Logueado...',
        token,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo iniciar sesión');
    }
  }

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    try {
      if (!password)
        throw new BadRequestException('La contraseña es requerida');

      const foundUser = await this.usersRepository.getUserByEmail(email);
      if (foundUser)
        throw new BadRequestException('El correo ya está registrado');
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.usersRepository.createUser({
        ...createUserDto,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Error al registrar al usuario');
    }
  }
}
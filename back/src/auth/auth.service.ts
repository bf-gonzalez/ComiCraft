import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Email y password requeridos');

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario Logueado...',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    if (!password) throw new BadRequestException('La contraseña es requerida');

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('El mail ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });
    
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/token.models';
import { Users } from 'src/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userServices: UsersService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userServices.getByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }

    return null;
  }

  async generateJWT(user: Users) {
    const payload: PayloadToken = { sub: user.id, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}

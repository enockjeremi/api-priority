import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private userServices: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.userServices.getByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }

    return null;
  }
}

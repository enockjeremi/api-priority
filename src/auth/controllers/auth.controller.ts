import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const user = req.user;
    return { user };
  }
}

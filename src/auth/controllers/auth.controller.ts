import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
// import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @Public()
  async login(@Request() req) {
    return this.authService.generateJWT(req.user);
  }
}

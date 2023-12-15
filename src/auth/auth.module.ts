import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'src/config';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configServices: ConfigType<typeof config>) => {
        return {
          secret: configServices.jwtAccess.jwtSecret,
          signOptions: {
            expiresIn: configServices.jwtAccess.jwtExpired,
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

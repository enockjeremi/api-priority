import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (_config: ConfigType<typeof config>) => {
        const { postgres } = _config;
        return {
          type: 'postgres',
          host: postgres.host,
          port: postgres.port,
          username: postgres.user,
          password: postgres.password,
          database: postgres.database,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}

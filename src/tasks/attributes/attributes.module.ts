import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Priority } from './entities/priority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Priority])],
})
export class AttributesModule {}

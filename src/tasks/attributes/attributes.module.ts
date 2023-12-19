import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../../common/entities/status.entity';
import { Priority } from '../../common/entities/priority.entity';
import { StatusController } from './controllers/status.controller';
import { PriorityController } from './controllers/priority.controller';
import { PriorityService } from './services/priority.service';
import { StatusService } from './services/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status, Priority])],
  controllers: [StatusController, PriorityController],
  providers: [PriorityService, StatusService],
})
export class AttributesModule {}

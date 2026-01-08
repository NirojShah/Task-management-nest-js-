import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

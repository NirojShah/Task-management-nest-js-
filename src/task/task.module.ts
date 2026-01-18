import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './task.entity';
import { JwtModule } from '@nestjs/jwt';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Team, User]), JwtModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

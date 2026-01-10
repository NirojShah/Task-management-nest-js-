import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRoles } from './teamRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamRoles])],
  controllers: [],
  providers: [],
})
export class TeamRole {}

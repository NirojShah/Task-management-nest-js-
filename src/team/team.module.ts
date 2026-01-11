import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

import { TeamRoleAssign } from 'src/teamRole/teamRole.assign.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamRoles } from 'src/teamRole/teamRole.entity';
import { TeamMember } from './teamMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Team,
      User,
      TeamRoles,
      TeamRoleAssign,
      TeamMember,
    ]),
    JwtModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

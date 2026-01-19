import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRoles } from './teamRole.entity';
import { TeamRoleCOntroller } from './team-role.controller';
import { TeamRoleService } from './team-role.service';
import { Team } from '../team/team.entity';
import { TeamRoleAssign } from './teamRole.assign.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamRoles, Team, TeamRoleAssign, User])],
  controllers: [TeamRoleCOntroller],
  providers: [TeamRoleService],
})
export class TeamRoleModule {}

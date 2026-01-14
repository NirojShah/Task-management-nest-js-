import { Body, Controller, Post } from '@nestjs/common';
import { TeamRoleService } from './team-role.service';
import { CreateTeamRoleDto } from './team-role.dto';
import { ResponseDto } from 'src/response/response.dto';

@Controller('team-roles')
export class TeamRoleCOntroller {
  constructor(private readonly teamRoleService: TeamRoleService) {}

  @Post()
  createTeamRole(
    @Body() createTeamRoleDto: CreateTeamRoleDto,
  ): Promise<ResponseDto<any>> {
    return this.teamRoleService.createTeamRole(createTeamRoleDto);
  }
}

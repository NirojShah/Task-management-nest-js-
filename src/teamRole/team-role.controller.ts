import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TeamRoleService } from './team-role.service';
import { AssignTeamRoleDto, CreateTeamRoleDto } from './team-role.dto';
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

  @Get(':teamId')
  getTeamRoles(@Param('teamId') teamId: number): Promise<ResponseDto<any>> {
    return this.teamRoleService.getTeamRoles(teamId);
  }

  @Post('/assign')
  asignTeamRoleToUser(
    assignTeamRoleDto: AssignTeamRoleDto,
  ): Promise<ResponseDto<any>> {
    return this.teamRoleService.asignTeamRoleToUser(assignTeamRoleDto);
  }

  @Delete('/remove')
  removeTeamRoleFromUser(
    assignTeamRoleDto: AssignTeamRoleDto,
  ): Promise<ResponseDto<any>> {
    return this.teamRoleService.removeTeamRoleFromUser(assignTeamRoleDto);
  }
}

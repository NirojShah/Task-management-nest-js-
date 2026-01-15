import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { ResponseDto } from 'src/response/response.dto';
import {
  AddTeamMemberDto,
  AssignRoleDto,
  CreateTeamDto,
  RemoveMemberDto,
  UpdateTeamDto,
} from './team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto): Promise<ResponseDto<any>> {
    return this.teamService.createTeam(createTeamDto);
  }

  @Get('/search')
  searchTeam(@Query('name') name?: string): Promise<ResponseDto<any>> {
    return this.teamService.searchTeam(name);
  }

  @Get('/get-details/:id')
  getTeamDetails(
    @Query('role') role: boolean,
    @Query('members') members: boolean,
    @Query('task') task: boolean,
    @Param('id') id: number,
  ): Promise<ResponseDto<any>> {
    return this.teamService.getTeamDetails(id, role, members, task);
  }

  @Patch()
  updateTeam(@Body() updateTeamDto: UpdateTeamDto): Promise<ResponseDto<any>> {
    return this.teamService.updateTeam(updateTeamDto);
  }

  @Post('/add-member')
  addUser(@Body() addUserDto: AddTeamMemberDto): Promise<ResponseDto<any>> {
    return this.teamService.addMember(addUserDto);
  }

  @Patch('/remove-member')
  removeUser(
    @Body() removeMemberDto: RemoveMemberDto,
  ): Promise<ResponseDto<any>> {
    return this.teamService.removeMember(removeMemberDto);
  }

  @Post('/assign-team-role')
  assignTeamRole(
    @Body() assignTeamRoleDto: AssignRoleDto,
  ): Promise<ResponseDto<any>> {
    return this.teamService.assignRole(assignTeamRoleDto);
  }
}

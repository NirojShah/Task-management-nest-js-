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

  @Patch()
  updateTeam(@Body() updateTeamDto: UpdateTeamDto): Promise<ResponseDto<any>> {
    return this.teamService.updateTeam(updateTeamDto);
  }

  @Post('/add-memeber')
  addUser(@Body() addUserDto: AddTeamMemberDto): Promise<ResponseDto<any>> {
    return this.addUser(addUserDto);
  }

  @Patch('/remove-member')
  removeUser(
    @Body() removeMemberDto: RemoveMemberDto,
  ): Promise<ResponseDto<any>> {
    return this.teamService.removeMember(removeMemberDto);
  }

  @Post('/assign-team-role')
  assignTeamRole(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
}

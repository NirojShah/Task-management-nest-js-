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
import { AddTeamMemberDto, CreateTeamDto } from './team.dto';

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

  @Get()
  getTeams(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }

  @Patch()
  updateTeam(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
  @Post('/add-memeber')
  addUser(@Body() addUserDto: AddTeamMemberDto): Promise<ResponseDto<any>> {
    return this.addUser(addUserDto);
  }
  @Patch('/remove-member')
  removeUser(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
  @Post('/assign-team-role')
  assignTeamRole(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
}

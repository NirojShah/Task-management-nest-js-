import { Controller, Get, Patch, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { ResponseDto } from 'src/response/response.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getTeams(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
  @Post()
  createTeam(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
  @Patch()
  updateTeam(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
  }
  @Post('/add-memeber')
  addUser(): Promise<ResponseDto<any>> {
    throw new Error('Implement this');
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

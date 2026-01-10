import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TeamRoles } from 'src/teamRole/teamRole.entity';
import { TeamInterface } from './team.interface';
import { ResponseDto } from 'src/response/response.dto';
import { CreateTeamDto } from './team.dto';

@Injectable()
export class TeamService implements TeamInterface {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TeamRoles)
    private teamRoleRepository: Repository<TeamRoles>,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto): Promise<ResponseDto<any>> {
    const existingTeam = await this.teamRepository.findOne({
      where: { name: createTeamDto.name },
    });

    if (existingTeam) {
      return {
        success: false,
        message: 'Team already exists',
      };
    }
    const team = this.teamRepository.create({
      ...createTeamDto,
      isActive: createTeamDto.isActive ?? true,
    });
    await this.teamRepository.save(team);

    return {
      success: true,
      message: 'Team created successfully',
      data: team,
    };
  }

  async addMember(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }
  async assignRole(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }
  async removeMember(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }
  async updateTeam(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }
}

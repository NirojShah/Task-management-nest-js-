import { ILike, Repository } from 'typeorm';
import { Team } from './team.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TeamRoles } from 'src/teamRole/teamRole.entity';
import { TeamInterface } from './team.interface';
import { ResponseDto } from 'src/response/response.dto';
import { AddTeamMemberDto, CreateTeamDto, UpdateTeamDto } from './team.dto';
import { TeamMember } from './teamMember.entity';

@Injectable()
export class TeamService implements TeamInterface {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TeamRoles)
    private teamRoleRepository: Repository<TeamRoles>,

    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
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

  async searchTeam(name?: string): Promise<ResponseDto<any>> {
    let teams: Team[];

    if (!name || name.trim() === '') {
      // Fetch all teams
      teams = await this.teamRepository.find();
    } else {
      // Partial match (case-insensitive)
      teams = await this.teamRepository.find({
        where: {
          name: ILike(`%${name}%`),
        },
      });
    }

    if (!teams || teams.length === 0) {
      return {
        success: false,
        message: 'No Teams available',
        data: [],
      };
    }

    return {
      success: true,
      message: 'Teams fetched successfully',
      data: teams,
    };
  }

  async addMember(addMemberDto: AddTeamMemberDto): Promise<ResponseDto<any>> {
    const team = await this.teamRepository.findOne({
      where: { id: addMemberDto.teamId },
    });
    if (!team) {
      return {
        success: false,
        message: 'Team not found',
      };
    }

    // 2. Check user exists
    const user = await this.userRepository.findOne({
      where: { userId: addMemberDto.userId },
    });

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const existingMember = await this.teamMemberRepository.findOne({
      where: {
        team: { id: addMemberDto.teamId },
        user: { userId: addMemberDto.userId },
      },
      relations: ['team', 'user'],
    });

    if (existingMember) {
      return {
        success: false,
        message: 'User already added to this team',
      };
    }

    const teamMember = this.teamMemberRepository.create({
      team,
      user,
    });
    await this.teamMemberRepository.save(teamMember);
    return {
      success: true,
      message: 'user added to the team successfully.',
    };
  }

  async assignRole(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  async removeMember(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  async updateTeam(updateTeamDto: UpdateTeamDto): Promise<ResponseDto<any>> {
    const team = await this.teamRepository.findOne({
      where: {
        id: updateTeamDto.teamId,
      },
    });
    if (!team) {
      throw new NotFoundException('Team not found with given Id.');
    }
    team.name = updateTeamDto.name || team.name;
    team.description = updateTeamDto.description || team.description;
    team.isActive = updateTeamDto.isActive || team.isActive;

    await this.teamRepository.save(team);
    return {
      success: true,
      message: 'team updated successfully',
      data: team,
    };
  }
}

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
import {
  AddTeamMemberDto,
  AssignRoleDto,
  CreateTeamDto,
  RemoveMemberDto,
  UpdateTeamDto,
} from './team.dto';
import { TeamMember } from './teamMember.entity';
import { TeamRoleAssign } from 'src/teamRole/teamRole.assign.entity';

@Injectable()
export class TeamService implements TeamInterface {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(TeamRoles)
    private teamRoleRepository: Repository<TeamRoles>,

    @InjectRepository(TeamRoleAssign)
    private teamRoleAssignRepo: Repository<TeamRoleAssign>,

    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  async teamMemberWithRoles(teamId: number): Promise<ResponseDto<any>> {
    const teamExists = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
      relations: ['teamMembers.user.teamRoleAssign.role'],
    });
    if (!teamExists) {
      throw new NotFoundException('Team not found.');
    }

    return {
      success: true,
      message: 'successfully fetched the team member with role',
      data: teamExists,
    };
  }

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

  async getTeamDetails(
    id: number,
    role: boolean,
    members: boolean,
    task: boolean,
  ): Promise<ResponseDto<any>> {
    let conditions: string[] = [];

    if (members) {
      conditions.push('teamMembers.user');
    }
    if (role) {
      conditions.push('teamRoles');
    }
    if (task) {
      conditions.push('tasks');
    }
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: conditions,
    });

    if (!team) {
      throw new NotFoundException('Team not found with given Id.');
    }
    return {
      success: true,
      message: 'Team details fetched successfully',
      data: team,
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

  async assignRole(assignRoleDto: AssignRoleDto): Promise<ResponseDto<any>> {
    const { userId, roleId, teamId } = assignRoleDto;

    const isTeam = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
    });

    if (!isTeam) {
      throw new NotFoundException('Team not found.');
    }

    const isTeamMember = await this.teamMemberRepository.findOne({
      where: {
        team: { id: teamId },
        user: { userId: userId },
      },
    });

    if (!isTeamMember) {
      throw new BadRequestException('User is not an member of the team.');
    }

    const isDuplicate = await this.teamRoleAssignRepo.findOne({
      where: { user: { userId: userId }, role: { id: roleId } },
    });

    if (isDuplicate) {
      throw new BadRequestException(
        'User is already assigned with the given role',
      );
    }

    const assignedRole = this.teamRoleAssignRepo.create({
      user: { userId: userId },
      role: { id: roleId },
    });

    const savedData = await this.teamRoleAssignRepo.save(assignedRole);

    if (!savedData) {
      throw new BadRequestException(
        'Failed to make role assignment to the user',
      );
    }

    return {
      success: true,
      message: 'Role assigned successfully',
    };
  }

  async removeMember(
    removeMemberDto: RemoveMemberDto,
  ): Promise<ResponseDto<any>> {
    const team = await this.teamRepository.findOne({
      where: {
        id: removeMemberDto.teamId,
      },
    });

    if (!team) {
      throw new NotFoundException('Team not found.');
    }

    const user = await this.userRepository.findOne({
      where: {
        userId: removeMemberDto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not found.');
    }

    await this.teamMemberRepository.delete({
      team: { id: team.id },
      user: { userId: user.userId },
    });
    return {
      success: true,
      message: `${user.firstName} is removed from ${team.name}`,
    };
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

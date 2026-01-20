import { ResponseDto } from 'src/response/response.dto';
import { TeamRoleInterface } from './team-role.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignTeamRoleDto, CreateTeamRoleDto } from './team-role.dto';
import { TeamRoles } from './teamRole.entity';
import { Team } from '../team/team.entity';
import { User } from 'src/user/user.entity';
import { TeamRoleAssign } from './teamRole.assign.entity';

@Injectable()
export class TeamRoleService implements TeamRoleInterface {
  constructor(
    @InjectRepository(TeamRoles)
    private teamRoleRepository: Repository<TeamRoles>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TeamRoleAssign)
    private teamRoleAssignRepository: Repository<TeamRoleAssign>,
  ) {}

  async createTeamRole(
    createTeamRoleDto: CreateTeamRoleDto,
  ): Promise<ResponseDto<any>> {
    const { name, description, teamId } = createTeamRoleDto;

    const team = await this.teamRepository.findOne({
      where: { id: teamId },
    });

    if (!team) {
      throw new NotFoundException(`Team not found with id: ${teamId}`);
    }

    const existingTeamRole = await this.teamRoleRepository.findOne({
      where: {
        name,
        team: {
          id: teamId,
        },
      },
      relations: ['team'], // optional but safe
    });

    if (existingTeamRole) {
      throw new BadRequestException(
        'Role with this name already exists in the team',
      );
    }

    const newRole = this.teamRoleRepository.create({
      name: name,
      description: description,
      team: { id: teamId },
    });

    const savedRole = await this.teamRoleRepository.save(newRole);

    return {
      success: true,
      message: 'Team role created successfully',
      data: savedRole,
    };
  }

  async getTeamRoles(teamId: number): Promise<ResponseDto<any>> {
    const isTeamExist = this.teamRepository.findOne({ where: { id: teamId } });

    if (!isTeamExist) {
      throw new NotFoundException(`Team not found with id: ${teamId}`);
    }
    const teamRoles = await this.teamRoleRepository.find({
      where: { team: { id: teamId } },
      // relations: ['team'],
    });

    if (teamRoles.length === 0) {
      throw new NotFoundException(`No roles found for team with id: ${teamId}`);
    }

    return {
      success: true,
      message: 'Team roles fetched successfully',
      data: teamRoles,
    };
  }

  async asignTeamRoleToUser(
    assignTeamRoleDto: AssignTeamRoleDto,
  ): Promise<ResponseDto<any>> {
    const { teamRoleId, userId } = assignTeamRoleDto;

    const getRoleData = await this.teamRoleRepository.findOne({
      where: { id: teamRoleId },
    });

    if (!getRoleData) {
      throw new NotFoundException(`Role with id - ${teamRoleId} not found.`);
    }

    const getUserData = await this.userRepository.findOne({
      where: { userId: userId },
    });

    if (!getUserData) {
      throw new NotFoundException(`User with id - ${userId} not found.`);
    }

    const newRoleAssignment = this.teamRoleAssignRepository.create({
      role: { id: teamRoleId },
      user: { userId: userId },
    });

    await this.teamRoleAssignRepository.save(newRoleAssignment);

    return {
      success: true,
      message: 'Role assigned successfully.',
    };
  }
}

import { ResponseDto } from '../response/response.dto';
import { AssignTeamRoleDto, CreateTeamRoleDto } from './team-role.dto';

export interface TeamRoleInterface {
  createTeamRole(
    createTeamRoleDto: CreateTeamRoleDto,
  ): Promise<ResponseDto<any>>;

  getTeamRoles(teamId: number): Promise<ResponseDto<any>>;

  asignTeamRoleToUser(
    assignTeamRoleDto: AssignTeamRoleDto,
  ): Promise<ResponseDto<any>>;

  removeTeamRoleFromUser(
    assignTeamRoleDto: AssignTeamRoleDto,
  ): Promise<ResponseDto<any>>;
}

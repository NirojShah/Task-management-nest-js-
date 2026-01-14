import { ResponseDto } from 'src/response/response.dto';
import { CreateTeamRoleDto } from './team-role.dto';

export interface TeamRoleInterface {
  createTeamRole(
    createTeamRoleDto: CreateTeamRoleDto,
  ): Promise<ResponseDto<any>>;
}

import { ResponseDto } from 'src/response/response.dto';
import {
  AddTeamMemberDto,
  CreateTeamDto,
  RemoveMemberDto,
  UpdateTeamDto,
} from './team.dto';

export interface TeamInterface {
  createTeam(createTeamDto: CreateTeamDto): Promise<ResponseDto<any>>;
  searchTeam(name?: string): Promise<ResponseDto<any>>;
  addMember(addMemberDto: AddTeamMemberDto): Promise<ResponseDto<any>>;
  assignRole(): Promise<ResponseDto<any>>;
  removeMember(removeMemberDto: RemoveMemberDto): Promise<ResponseDto<any>>;
  updateTeam(updateTeamDto: UpdateTeamDto): Promise<ResponseDto<any>>;
}

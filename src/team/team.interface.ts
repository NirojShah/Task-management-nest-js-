import { ResponseDto } from "src/response/response.dto";
import { AddTeamMemberDto, CreateTeamDto } from "./team.dto";

export interface TeamInterface{
    createTeam(createTeamDto: CreateTeamDto): Promise<ResponseDto<any>>
    addMember(addMemberDto: AddTeamMemberDto): Promise<ResponseDto<any>>
    assignRole(): Promise<ResponseDto<any>>
    removeMember(): Promise<ResponseDto<any>>
    updateTeam(): Promise<ResponseDto<any>>
}
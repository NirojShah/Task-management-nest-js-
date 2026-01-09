import { ResponseDto } from "src/response/response.dto";
import { CreateRole } from "./role.dto";
import { RolesInterface } from "./role.interface";

export class RolesService implements RolesInterface{
    async createRole(createRolesDto: CreateRole): Promise<ResponseDto<any>> {
        throw new Error("Method not implemented.");
    }
    async updateRole(updateRole: any): Promise<ResponseDto<any>> {
        throw new Error("Method not implemented.");
    }
    async getRoles(): Promise<ResponseDto<any>> {
        throw new Error("Method not implemented.");
    }
    async deleteRole(roleId: number): Promise<ResponseDto<any>> {
        throw new Error("Method not implemented.");
    }
    async assignRole(userId: number, roleId: number): Promise<ResponseDto<any>> {
        throw new Error("Method not implemented.");
    }
    
}
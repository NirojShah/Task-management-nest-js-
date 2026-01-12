import { ResponseDto } from 'src/response/response.dto';
import { CreateRole } from './role.dto';

export interface RolesInterface {
  createRole(createRolesDto: CreateRole): Promise<ResponseDto<any>>;
  updateRole(updateRole: any): Promise<ResponseDto<any>>;
  getRoles(): Promise<ResponseDto<any>>;
  deleteRole(roleId: number): Promise<ResponseDto<any>>;
  assignRole(userId: number, roleId: number): Promise<ResponseDto<any>>;
}

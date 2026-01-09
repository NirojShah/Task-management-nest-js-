import { ResponseDto } from 'src/response/response.dto';
import { CreateRole } from './role.dto';
import { RolesInterface } from './role.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService implements RolesInterface {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async createRole(createRolesDto: CreateRole): Promise<ResponseDto<any>> {
    const roleExists = await this.rolesRepository.findOne({
      where: {
        name: createRolesDto.name,
      },
    });
    if(roleExists){
        return {
            success: false,
            message:"Role already Exists."
        }
    }
    const newRole = this.rolesRepository.create(createRolesDto);
    await this.rolesRepository.save(newRole);
    return {
      success: true,
      message: 'Role created.',
    };
  }
  async updateRole(updateRole: any): Promise<ResponseDto<any>> {
    throw new Error('Method not implemented.');
  }
  async getRoles(): Promise<ResponseDto<any>> {
    const roles = await this.rolesRepository.find();
    return {
        success: true,
        message:"Roles Fetched successfully.",
        data: roles
    }
  }
  async deleteRole(roleId: number): Promise<ResponseDto<any>> {
    const roleExists = await this.rolesRepository.findOne({
        where:{
            id: roleId
        }
    })
    if(!roleExists){
        throw new NotFoundException("role does not exists.")
    }
    await this.rolesRepository.delete({id: roleId})
    
    return{
        success: true,
        message: "Role Deleted successfully."
    }
  }
  async assignRole(userId: number, roleId: number): Promise<ResponseDto<any>> {
    throw new Error('Method not implemented.');
  }
}

import { ResponseDto } from 'src/response/response.dto';
import { CreateRole, UpdateRoleDTO } from './role.dto';
import { RolesInterface } from './role.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './role.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { RoleAssign } from './role.assign.entity';

@Injectable()
export class RolesService implements RolesInterface {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RoleAssign)
    private roleAssignRepository: Repository<RoleAssign>,
  ) {}
  async createRole(createRolesDto: CreateRole): Promise<ResponseDto<any>> {
    const roleExists = await this.rolesRepository.findOne({
      where: {
        name: createRolesDto.name,
      },
    });
    if (roleExists) {
      return {
        success: false,
        message: 'Role already Exists.',
      };
    }
    const newRole = this.rolesRepository.create(createRolesDto);
    await this.rolesRepository.save(newRole);
    return {
      success: true,
      message: 'Role created.',
    };
  }
  async updateRole(updateRole: UpdateRoleDTO): Promise<ResponseDto<any>> {
    const roleExists = await this.rolesRepository.findOne({
      where: {
        id: updateRole.roleId,
      },
    });

    if (!roleExists) {
      throw new NotFoundException(
        `Role not found with roleId - ${updateRole.roleId}`,
      );
    }

    roleExists.name = updateRole.newRoleName;
    await this.roleAssignRepository.save(roleExists);

    return {
      success: true,
      message: 'updated role successfully..',
      data: {
        roleName: roleExists.name,
      },
    };
  }
  async getRoles(): Promise<ResponseDto<any>> {
    const roles = await this.rolesRepository.find();
    return {
      success: true,
      message: 'Roles Fetched successfully.',
      data: roles,
    };
  }
  async deleteRole(roleId: number): Promise<ResponseDto<any>> {
    const roleExists = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!roleExists) {
      throw new NotFoundException('role does not exists.');
    }
    await this.rolesRepository.delete({ id: roleId });

    return {
      success: true,
      message: 'Role Deleted successfully.',
    };
  }
  async assignRole(userId: number, roleId: number): Promise<ResponseDto<any>> {
    const userExists = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const roleExists = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });

    if (!roleExists) {
      throw new NotFoundException('Role not found.');
    }

    const newRoleAssign = this.roleAssignRepository.create({
      role: { id: roleId },
      user: { userId: userId },
    });

    return {
      success: true,
      message: 'role assigned successfully.',
      data: newRoleAssign,
    };
  }
}

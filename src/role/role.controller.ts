import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseDto } from 'src/response/response.dto';
import { AssignRoleDTO, CreateRole } from './role.dto';
import { RolesService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRole: CreateRole): Promise<ResponseDto<any>> {
    if (!createRole.description || !createRole.name) {
      throw new Error('Please send role Name and Description.');
    }
    return this.rolesService.createRole(createRole);
  }

  @Post("/assign")
  async assignRole(
    @Body() assignRoleDto: AssignRoleDTO,
  ): Promise<ResponseDto<any>> {
    return this.rolesService.assignRole(
      assignRoleDto.userId,
      assignRoleDto.roleId,
    );
  }

  @Patch()
  async updateRole(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  @Get()
  async getRoles(): Promise<ResponseDto<any>> {
    return this.rolesService.getRoles();
  }

  @Delete(':roleId')
  async deleteRole(@Param('roleId') roleId: number): Promise<ResponseDto<any>> {
    return this.rolesService.deleteRole(+roleId);
  }
}

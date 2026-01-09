import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseDto } from 'src/response/response.dto';
import { AssignRoleDTO, CreateRole } from './role.dto';

@Controller('roles')
class RoleController {
  constructor() {}

  @Post()
  async createRole(@Body() createRole: CreateRole): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  @Put()
  async assignRole(
    @Body() assignRoleDto: AssignRoleDTO
  ): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  @Patch()
  async updateRole(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  @Get()
  async getRoles(
    
  ): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }

  @Delete('/:roleId')
  async deleteRole(): Promise<ResponseDto<any>> {
    throw new Error('implement this');
  }
}

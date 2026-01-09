import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRole {
  @IsString({ message: 'Role name must be a string' })
  @IsNotEmpty({ message: 'Role name is required' })
  @Length(2, 50, { message: 'Role name must be between 2 and 50 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters',
  })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive?: boolean;
}

export class AssignRoleDTO {
  @IsNumber({}, { message: 'UserId must be a string' })
  @IsNotEmpty({ message: 'UserId is required' })
  userId: number;

  @IsNumber({}, { message: 'RoleId must be a string' })
  @IsNotEmpty({ message: 'RoleId is required' })
  roleId: number;
}

export class UpdateRoleDTO{
    
} 

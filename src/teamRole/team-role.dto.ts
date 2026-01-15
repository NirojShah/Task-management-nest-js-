import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTeamRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  teamId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class AssignTeamRoleDto {
  @IsInt()
  @IsNotEmpty()
  teamRoleId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}

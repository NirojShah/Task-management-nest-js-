import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  description: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTeamDto {

  @IsNumber()
  @IsNotEmpty()
  teamId: number

  @IsString()
  @IsOptional()
  @Length(2, 100)
  name?: string;

  @IsString()
  @IsOptional()
  @Length(5, 255)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}



export class AddTeamMemberDto {
  @IsNumber()
  teamId: number;

  @IsNumber()
  userId: number;
}

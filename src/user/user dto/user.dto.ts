import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsIn,
  Length,
} from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumberString()
  @Length(10, 15)
  phoneNo: string;

  @IsIn(['MALE', 'FEMALE', 'OTHER'])
  gender: string;

  @IsString()
  password: string
}

export class LoginDto{
    @IsEmail()
    email: string

    @IsString()
    password: string
}
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsIn,
  Length,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'First Name feild is required.' })
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last Name feild is required.' })
  @Length(2, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email feild is required.' })
  email: string;

  @IsNumberString()
  @Length(10)
  @IsNotEmpty({ message: 'Phone feild is required.' })
  phoneNo: string;

  @ValidateIf((o) => o.gender !== undefined) // Check if gender is present
  @IsIn(['MALE', 'FEMALE', 'OTHER'], {
    message: 'Gender must be one of the following values: MALE, FEMALE, OTHER.',
  })
  @IsNotEmpty({ message: 'Gender field is required.' })
  gender: string;

  @IsString()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

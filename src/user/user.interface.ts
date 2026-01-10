import { ResponseDto } from 'src/response/response.dto';
import { CreateUserDto, LoginDto } from './user dto/user.dto';
import { User } from './user.entity';

export interface UserInterface {
  createUser(createUserDto: CreateUserDto): Promise<ResponseDto<User>>;
  login(loginDto: LoginDto): Promise<ResponseDto<any>>;
  allUsers(): Promise<ResponseDto<any>>
}

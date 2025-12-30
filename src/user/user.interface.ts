import { CreateUserDto, LoginDto } from "./user dto/user.dto";
import { ResponseDto } from "./user dto/user.response.dto";
import { User } from "./user.entity";

export interface UserInterface{
    createUser(createUserDto: CreateUserDto): Promise<ResponseDto<User>>
    login(loginDto: LoginDto): Promise<ResponseDto<any>>
}
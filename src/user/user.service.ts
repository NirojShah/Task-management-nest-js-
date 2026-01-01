import { InjectRepository } from "@nestjs/typeorm";
import { UserInterface } from "./user.interface";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, LoginDto } from "./user dto/user.dto";
import { ResponseDto } from "./user dto/user.response.dto";
import { BadRequestException } from "@nestjs/common";

export class UserService implements UserInterface{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<ResponseDto<User>> {
        const user = await this.userRepository.findOne({where:{email: createUserDto.email}})
        if(user){
            throw new BadRequestException("User already exists.")
        }
        const newUser = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(newUser)

        const userInfo = await this.userRepository.findOne({where: {email: createUserDto.email}})
        return {
            success: true,
            message: "user created successfully",
            data: savedUser
        }
    }
    async login(loginDto: LoginDto): Promise<ResponseDto<any>> {
        
    }
}
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './user.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './user dto/user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/response/response.dto';
@Injectable()
export class UserService implements UserInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseDto<User>> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('User already exists.');
    }
    const newUser = this.userRepository.create(createUserDto);
    if (!newUser) {
      throw new BadRequestException('Benki bitt');
    }
    const savedUser = await this.userRepository.save(newUser);

    const userInfo = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    return {
      success: true,
      message: 'user created successfully',
      data: savedUser,
    };
  }

  async login(loginDto: LoginDto): Promise<ResponseDto<any>> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email, password: loginDto.password },
    });
    if (!user) {
      throw new BadRequestException('Invalid Credentials.');
    }
    const payLoad = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userId: user.userId,
    };
    const token = this.jwtService.sign(payLoad);

    return {
      success: true,
      message: 'Login successfull',
      data: {
        token,
      },
    };
  }
}

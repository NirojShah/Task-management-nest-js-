import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from './user.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginDto } from './user dto/user.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/response/response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
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
    const saltRound: number = 10;
    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      saltRound,
    );
    const savedUser = await this.userRepository.save({
      email: createUserDto.email,
      firstName: createUserDto.firstName,
      gender: createUserDto.gender,
      lastName: createUserDto.lastName,
      phoneNo: createUserDto.phoneNo,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = savedUser;

    return {
      success: true,
      message: 'user created successfully',
      data: userWithoutPassword,
    };
  }

  async login(loginDto: LoginDto): Promise<ResponseDto<any>> {
    if (loginDto.email == undefined || loginDto.password == undefined) {
      throw new BadRequestException('Please send email and password.');
    }
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new BadRequestException('Invalid Credentials.');
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid Credentials');
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

  async allUsers(): Promise<ResponseDto<any>> {
    const users = await this.userRepository.find();
    return {
      success: true,
      message: 'users fetched successfullly',
      data: users,
    };
  }
}

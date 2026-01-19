import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './user dto/user.dto';
import { ResponseDto } from 'src/response/response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDto<any>> {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
    return this.userService.login(loginDto);
  }

  @Get()
  async getUsers(): Promise<ResponseDto<any>> {
    return this.userService.allUsers();
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: number): Promise<ResponseDto<any>> {
    return this.userService.singleUserInfo(userId);
  }
}

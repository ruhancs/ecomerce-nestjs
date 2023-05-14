import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICreateUserDto } from './dtos/createUserDto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ResponseUserDto } from './dtos/responseUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: ICreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers(): Promise<ResponseUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ResponseUserDto(userEntity),
    );
  }
}

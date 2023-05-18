import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ICreateUserDto } from './dtos/createUserDto';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { ResponseUserDto } from './dtos/responseUser.dto';
import { UpdatePasswordDto } from './dtos/updatePasswordDto';
import { UserId } from '../decorators/user.decorator';

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

  @Get('/:userId')
  async getUserIncludeAddress(
    @Param('userId') userId: number,
  ): Promise<ResponseUserDto> {
    return new ResponseUserDto(
      await this.userService.getUserIncludeAddress(userId),
    );
  }

  @Patch('/update-password')
  async updatePassword(
    @UserId() id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    return this.userService.updatePassword(id, updatePasswordDto);
  }
}

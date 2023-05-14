import { Body, Controller, Post } from '@nestjs/common';
import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ResponseUserDto> {
    return new ResponseUserDto(await this.authService.login(loginDto));
  }
}

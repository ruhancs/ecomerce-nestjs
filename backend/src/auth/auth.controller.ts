import { Body, Controller, Post } from '@nestjs/common';
import { ResponseUserDto } from '../user/dtos/responseUser.dto';
import { LoginDto } from './dtos/Login.dto';
import { AuthService } from './auth.service';
import { ResponseLogin } from './dtos/ResponseLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ResponseLogin> {
    return await this.authService.login(loginDto);
  }
}

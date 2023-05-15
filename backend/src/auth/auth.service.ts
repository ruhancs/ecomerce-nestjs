import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/Login.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ResponseLogin } from './dtos/ResponseLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';
import { TokenPayload } from './dtos/TokenPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    if (!user) {
      throw new NotFoundException('Email or password invalid');
    }

    const isMatch = await compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new NotFoundException('Email or password invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new TokenPayload(user) }),
      user: new ResponseUserDto(user),
    };
  }
}

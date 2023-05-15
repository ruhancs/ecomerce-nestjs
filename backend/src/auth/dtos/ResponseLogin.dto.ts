import { ResponseUserDto } from 'src/user/dtos/responseUser.dto';

export interface ResponseLogin {
  user: ResponseUserDto;
  accessToken: string;
}

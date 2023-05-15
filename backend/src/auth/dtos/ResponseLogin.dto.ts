import { ResponseUserDto } from '../../user/dtos/responseUser.dto';

export interface ResponseLogin {
  user: ResponseUserDto;
  accessToken: string;
}

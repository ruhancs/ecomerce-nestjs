import { LoginDto } from 'src/auth/dtos/Login.dto';
import { userEntityMock } from './user.mock';

export const loginDtoMock: LoginDto = {
  email: userEntityMock.email,
  password: userEntityMock.password,
};

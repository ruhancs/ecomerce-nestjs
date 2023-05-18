import { UpdatePasswordDto } from 'src/user/dtos/updatePasswordDto';

export const updatePasswordMock: UpdatePasswordDto = {
  password: '123456',
  newPassword: '12345678',
};

export const passwordInvalidMock: UpdatePasswordDto = {
  password: '123',
  newPassword: 'asdgaef',
};

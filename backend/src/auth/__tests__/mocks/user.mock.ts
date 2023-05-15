import { UserEntity } from '../../../user/entity/user.entity';
import { UserType } from '../../../user/enum/userTypes.enum';

export const userEntityMock: UserEntity = {
  cpf: '11242353454',
  createdAt: new Date(),
  email: 'mock@email.com',
  password: '"$2b$10$YpXZpmRYB./szK37ks.M.eTvVlPed8IygE8.XzBiRgmKXUP8hz9rS"',
  name: 'mock',
  updatedAt: new Date(),
  id: 50,
  phone: '98483673',
  typeUser: UserType.User,
  addresses: [],
};

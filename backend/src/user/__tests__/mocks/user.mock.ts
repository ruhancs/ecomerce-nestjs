import { UserEntity } from '../../entity/user.entity';
import { UserType } from '../../enum/userTypes.enum';

export const userEntityMock: UserEntity = {
  cpf: '11242353454',
  createdAt: new Date(),
  email: 'mock@email.com',
  password: '123456',
  name: 'mock',
  updatedAt: new Date(),
  id: 50,
  phone: '98483673',
  typeUser: UserType.User,
  addresses: [],
};

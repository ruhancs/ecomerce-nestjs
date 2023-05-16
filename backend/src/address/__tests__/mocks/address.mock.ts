import { AddressEntity } from '../../entity/address.entity';
import { cityMock } from '../../../city/__tests__/mocks/city.mock';
import { userEntityMock } from '../../../user/__tests__/mocks/user.mock';

export const addressMock: AddressEntity = {
  id: 3,
  userId: userEntityMock.id,
  complement: 'casa',
  numberAddress: 543,
  cep: '324682374',
  cityId: cityMock[0].id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

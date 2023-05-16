import { CreateAddressDto } from '../../dtos/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressDtoMock: CreateAddressDto = {
  complement: 'casa',
  numberAddress: addressMock.numberAddress,
  cep: addressMock.cep,
  cityId: addressMock.cityId,
};

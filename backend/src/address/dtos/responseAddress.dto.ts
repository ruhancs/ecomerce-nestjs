import { ResponseCityDto } from '../../city/dtos/ResponseCity.dto';
import { AddressEntity } from '../entity/address.entity';

export class ResponseAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  city?: ResponseCityDto;

  constructor(addressEntity: AddressEntity) {
    this.complement = addressEntity.complement;
    this.numberAddress = addressEntity.numberAddress;
    this.cep = addressEntity.cep;
    this.city = addressEntity.city
      ? new ResponseCityDto(addressEntity.city)
      : undefined;
  }
}

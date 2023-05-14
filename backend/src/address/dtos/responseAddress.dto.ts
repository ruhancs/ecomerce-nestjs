import { AddressEntity } from '../entity/address.entity';

export class ResponseAddressDto {
  complement: string;
  numberAddress: number;
  cep: string;
  //   city?: any;

  constructor(addressEntity: AddressEntity) {
    this.complement = addressEntity.complement;
    this.numberAddress = addressEntity.numberAddress;
    this.cep = addressEntity.cep;
    // this.city = addressEntity.city;
  }
}

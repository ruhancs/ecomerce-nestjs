import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userTypes.enum';
import { UserId } from '../decorators/user.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserType.User)
  @Post()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    console.log(userId);
    return this.addressService.createAddress(createAddressDto, userId);
  }
}

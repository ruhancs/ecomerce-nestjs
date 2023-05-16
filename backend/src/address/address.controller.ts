import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressService } from './address.service';
import { AddressEntity } from './entity/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userTypes.enum';
import { UserId } from '../decorators/user.decorator';
import { ResponseAddressDto } from './dtos/responseAddress.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Roles(UserType.User)
  @Post()
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Roles(UserType.User, UserType.Admin)
  @Get()
  async findUserAddresses(
    @UserId() userId: number,
  ): Promise<ResponseAddressDto[]> {
    return (await this.addressService.findUserAddresses(userId)).map(
      (address) => new ResponseAddressDto(address),
    );
  }
}

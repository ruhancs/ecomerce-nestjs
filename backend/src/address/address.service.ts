import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressEntity } from './entity/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addresRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly citySevice: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    await this.userService.findUserById(userId);
    await this.citySevice.findCityById(createAddressDto.cityId);
    return this.addresRepository.save({
      ...createAddressDto,
      userId,
    });
  }

  async findUserAddresses(userId: number): Promise<AddressEntity[]> {
    await this.userService.findUserById(userId);

    const addresses = await this.addresRepository.find({
      where: {
        userId,
      },
      relations: {
        city: {
          state: true,
        },
      },
    });

    if (!addresses || addresses.length === 0) {
      throw new NotFoundException('user has no addresses registered');
    }

    return addresses;
  }
}

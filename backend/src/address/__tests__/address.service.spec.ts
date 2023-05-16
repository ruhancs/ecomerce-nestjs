import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressService } from '../address.service';
import { AddressEntity } from '../entity/address.entity';
import { addressMock } from './mocks/address.mock';
import { UserService } from '../../user/user.service';
import { userEntityMock } from '../../user/__tests__/mocks/user.mock';
import { CityService } from '../../city/city.service';
import { cityMock } from '../../city/__tests__/mocks/city.mock';
import { createAddressDtoMock } from './mocks/createAddressDto.mock';

describe('AddressService', () => {
  let service: AddressService;
  let userService: UserService;
  let cityService: CityService;
  let addressRepository: Repository<AddressEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: UserService,
          useValue: {
            findUserById: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findCityById: jest.fn().mockResolvedValue(cityMock[0]),
          },
        },
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
            find: jest.fn().mockResolvedValue(addressMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('should return an address on save', async () => {
    const address = await service.createAddress(
      createAddressDtoMock,
      addressMock.userId,
    );

    expect(address).toEqual(addressMock);
  });

  it('should return all user addresses', async () => {
    const addresses = await service.findUserAddresses(addressMock.userId);

    expect(addresses).toEqual(addressMock);
  });

  it('should return an empty array if user does not registered an address', async () => {
    jest.spyOn(addressRepository, 'find').mockRejectedValueOnce(new Error());

    expect(
      service.findUserAddresses(addressMock.userId),
    ).rejects.toThrowError();
  });

  it('should return an error if user does not exist', async () => {
    jest.spyOn(userService, 'findUserById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressDtoMock, addressMock.userId),
    ).rejects.toThrowError();
  });

  it('should return an error if city does not exist', async () => {
    jest.spyOn(cityService, 'findCityById').mockRejectedValueOnce(new Error());

    expect(
      service.createAddress(createAddressDtoMock, addressMock.userId),
    ).rejects.toThrowError();
  });
});

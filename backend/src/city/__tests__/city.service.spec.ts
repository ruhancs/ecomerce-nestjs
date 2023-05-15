import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { cityMock } from './mocks/city.mock';
import { CityService } from '../city.service';
import { CityEntity } from '../entity/city.entity';
import { CacheService } from '../../cache/cache.service';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(cityMock),
            findOne: jest.fn().mockResolvedValue(cityMock[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return one city', async () => {
    const city = await service.findCityById(2);

    expect(city).toEqual(cityMock[0]);
  });

  it('should return error if city id does not exist', async () => {
    jest.spyOn(cityRepository, 'findOne').mockRejectedValueOnce(new Error());

    expect(service.findCityById(50)).rejects.toThrowError();
  });
});

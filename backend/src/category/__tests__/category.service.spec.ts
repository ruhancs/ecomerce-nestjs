import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../enteties/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categoryEntityMock } from './mocks/categoryEntity.mock';
import { createCategoryMock } from './mocks/createCategory.mock';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<CategoryEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(CategoryEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(categoryEntityMock),
            findOne: jest.fn().mockResolvedValue(categoryEntityMock),
            save: jest.fn().mockResolvedValue(categoryEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<CategoryEntity>>(
      getRepositoryToken(CategoryEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all categories', async () => {
    const categories = await service.findAll();
    expect(categories).toEqual(categoryEntityMock);
  });

  it('should return one category', async () => {
    const categories = await service.findCategoryByName(
      categoryEntityMock.name,
    );
    expect(categories).toEqual(categoryEntityMock);
  });

  it('should return the created category', async () => {
    const category = await service.createCategory(createCategoryMock);
    expect(category).toEqual(categoryEntityMock);
  });
});

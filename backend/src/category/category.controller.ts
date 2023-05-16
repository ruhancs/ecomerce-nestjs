import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryEntity } from './enteties/category.entity';
import { ResponseCategoryDto } from './dtos/responsecategory.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userTypes.enum';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @Roles(UserType.Admin, UserType.User)
  async findAll(): Promise<ResponseCategoryDto[]> {
    return (await this.categoryService.findAll()).map(
      (category) => new ResponseCategoryDto(category),
    );
  }

  @Post()
  @Roles(UserType.Admin)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    return new ResponseCategoryDto(
      await this.categoryService.createCategory(createCategoryDto),
    );
  }
}

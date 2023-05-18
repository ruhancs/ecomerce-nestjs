import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userTypes.enum';
import { ResponseProductDto } from './dtos/responseProduct.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { DeleteResult } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(UserType.Admin)
  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get()
  async allProducts(): Promise<ResponseProductDto[]> {
    return (await this.productService.allProducts()).map(
      (product) => new ResponseProductDto(product),
    );
  }

  @Roles(UserType.Admin)
  @Delete('/:id')
  async removeProduct(@Param('id') id: number): Promise<DeleteResult> {
    return this.productService.removeProduct(id);
  }
}

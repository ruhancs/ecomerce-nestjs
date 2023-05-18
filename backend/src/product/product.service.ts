import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    await this.categoryService.findCategoryById(createProductDto.categoryId);

    const product = await this.findProductByName(createProductDto.name).catch(
      () => undefined,
    );

    if (product) {
      throw new ConflictException('product name already registered');
    }
    this.productRepository.create(createProductDto);

    return this.productRepository.save(createProductDto);
  }

  async allProducts(): Promise<ProductEntity[]> {
    return this.productRepository.find({
      relations: {
        category: true,
      },
    });
  }

  async findProductByName(productName: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        name: productName,
      },
    });

    if (!product) {
      throw new NotFoundException('product name does not exist');
    }

    return product;
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException('product id does not exist');
    }

    return product;
  }

  async removeProduct(id: number): Promise<DeleteResult> {
    await this.findProductById(id);
    try {
      return this.productRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}

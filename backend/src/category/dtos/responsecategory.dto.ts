import { ProductEntity } from '../../product/entities/product.entity';
import { CategoryEntity } from '../enteties/category.entity';

export class ResponseCategoryDto {
  id: number;
  name: string;
  //   products?: ProductEntity[];

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;

    // this.products = categoryEntity.products
    //   ? categoryEntity.products.map(
    //       (address) => new ResponseAddressDto(address),
    //     )
    //   : undefined;
  }
}

import { CartProductEntity } from 'src/cart-product/entities/cartProduct.entity';
import { ResponseProductDto } from 'src/product/dtos/responseProduct.dto';

export class ResponseCartProductDto {
  id: number;
  cartId: number;
  productId: number;
  amount: number;
  product?: ResponseProductDto;

  constructor(cartProductEntity: CartProductEntity) {
    this.id = cartProductEntity.id;
    this.cartId = cartProductEntity.cartId;
    this.productId = cartProductEntity.productId;
    this.amount = cartProductEntity.amount;
    this.product = cartProductEntity.product
      ? new ResponseProductDto(cartProductEntity.product)
      : undefined;
  }
}

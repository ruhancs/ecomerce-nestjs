import { CartProductEntity } from 'src/cart-product/entities/cartProduct.entity';
import { CartEntity } from '../entities/cart.entity';
import { ResponseCartProductDto } from 'src/cart-product/dtos/responseCartProduct.dto';

export class ResponseCartDto {
  id: number;
  cartProducts: ResponseCartProductDto[];

  constructor(cartEntity: CartEntity) {
    this.id = cartEntity.id;
    this.cartProducts = cartEntity.cartProducts
      ? cartEntity.cartProducts.map((cp) => new ResponseCartProductDto(cp))
      : undefined;
  }
}

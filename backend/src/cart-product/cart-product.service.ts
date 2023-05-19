import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cartProduct.entity';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { InsertCartDto } from 'src/cart/dtos/insertCart.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    cartId: number,
    productId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        cartId,
        productId,
      },
    });

    if (!cartProduct) {
      throw new NotFoundException('product not found in this cart');
    }

    return cartProduct;
  }

  async createCartProduct(
    insertCartDto: InsertCartDto,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      cartId,
      amount: insertCartDto.amount,
      productId: insertCartDto.productId,
    });
  }

  async insertProductInCart(
    insertCartDto: InsertCartDto,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCartDto.productId);

    const cartProduct: CartProductEntity = await this.verifyProductInCart(
      cart.id,
      insertCartDto.productId,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createCartProduct(insertCartDto, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + insertCartDto.amount,
    });
  }
}

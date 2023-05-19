import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CreateCartDto } from './dtos/createCart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async findUserCart(
    userId: number,
    withRelations: boolean,
  ): Promise<CartEntity> {
    const relations = withRelations
      ? { cartProducts: { product: true } }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations: relations,
    });

    if (!cart) {
      throw new NotFoundException('cart not found');
    }

    return cart;
  }

  async newCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({
      active: true,
      userId,
    });
  }

  // async getUserCart(userId: number): Promise<CartEntity> {
  //   return this.cartRepository.findOne({
  //     where: {
  //       userId,
  //       active: true,
  //     },
  //     relations: { cartProducts: { product: true } },
  //   });
  // }

  async inserInCart(
    userId: number,
    insertCartDto: InsertCartDto,
  ): Promise<CartEntity> {
    const cart = await this.findUserCart(userId, false).catch(async () =>
      this.newCart(userId),
    );

    await this.cartProductService.insertProductInCart(insertCartDto, cart);

    return cart;
  }

  async updateProductCart(
    updateCartDto: InsertCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findUserCart(userId, false);

    await this.cartProductService.updateProductInCart(updateCartDto, cart);

    return cart;
  }

  async clearCart(userId: number) {
    const cart = await this.findUserCart(userId, false);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return { cartStatus: 'disabled' };
  }

  async removeCartProduct(
    userId: number,
    productId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findUserCart(userId, false);

    return this.cartProductService.removeCartProduct(cart.id, productId);
  }
}

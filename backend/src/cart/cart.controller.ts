import { Body, Controller, Post } from '@nestjs/common';
import { CartEntity } from './entities/cart.entity';
import { InsertCartDto } from './dtos/insertCart.dto';
import { CartService } from './cart.service';
import { UserId } from 'src/decorators/user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/userTypes.enum';
import { ResponseCartDto } from './dtos/responseCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserType.User, UserType.Admin)
  @Post()
  async inserInCart(
    @UserId() userId,
    @Body() insercartDto: InsertCartDto,
  ): Promise<ResponseCartDto> {
    return new ResponseCartDto(
      await this.cartService.inserInCart(userId, insercartDto),
    );
  }
}

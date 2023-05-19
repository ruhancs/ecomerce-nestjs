import { IsBoolean, IsNumber } from 'class-validator';

export class CreateCartProducttDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  cartId: number;

  @IsNumber()
  productId: number;
}

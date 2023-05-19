import { IsBoolean, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsBoolean()
  active: boolean;
}

import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

// herda de PaymentEntity
@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payment', nullable: false })
  amountPayment: number;

}

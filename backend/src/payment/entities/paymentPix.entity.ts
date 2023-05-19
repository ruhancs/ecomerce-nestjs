import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';

// herda de PaymentEntity
@ChildEntity()
export class PaymentPixEntity extends PaymentEntity {
  @Column({ name: 'code', nullable: false })
  code: number;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;
}

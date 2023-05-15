import { UserEntity } from 'src/user/entity/user.entity';

export class TokenPayload {
  id: number;
  typeUser: number;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}

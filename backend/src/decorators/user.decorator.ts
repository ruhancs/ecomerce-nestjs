import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { payloadConversor } from '../address/utils/base-64-converter';
import { UserEntity } from 'src/user/entity/user.entity';

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): number => {
    const { authorization } = ctx.switchToHttp().getRequest().headers;

    const payload = payloadConversor(authorization);

    return payload?.id;
  },
);

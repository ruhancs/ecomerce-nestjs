import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { payloadConversor } from 'src/address/utils/base-64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const payload = payloadConversor(authorization);

  return payload?.id;
});

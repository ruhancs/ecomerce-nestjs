import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../auth/dtos/TokenPayload.dto';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userTypes.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers; // header com token

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const tokenPayload: TokenPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET_KEY,
      })
      .catch(() => undefined);

    if (!tokenPayload) {
      return false;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === tokenPayload.typeUser);
  }
}

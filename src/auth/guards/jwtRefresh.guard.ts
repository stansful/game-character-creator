import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { JwtPayloadInterface } from '../interfaces/jwtPayload.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigurationTypes } from '../../config/enums/configurationTypes.enum';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    try {
      const token = req.cookies.refresh_token.replace('Bearer ', '');
      const payload: JwtPayloadInterface = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get(ConfigurationTypes.JWT_REFRESH_SECRET),
        },
      );
      req.user = await this.userService.getById(payload.id);
    } catch (e) {
      throw new UnauthorizedException('Refresh token malformed or expired');
    }

    return true;
  }
}

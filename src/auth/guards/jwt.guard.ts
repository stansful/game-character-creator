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

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    try {
      const token = req.cookies.authorization.replace('Bearer ', '');
      const payload: JwtPayloadInterface = await this.jwtService.verifyAsync(
        token,
      );
      req.user = await this.userService.getById(payload.id);
    } catch (e) {
      throw new UnauthorizedException('Access token malformed or expired');
    }

    return true;
  }
}

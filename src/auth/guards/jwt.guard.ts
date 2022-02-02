import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    try {
      const token = req.cookies.authorization.replace('Bearer ', '');
      req.user = await this.jwtService.verifyAsync(token);
    } catch (e) {
      throw new UnauthorizedException('Access token malformed or expired');
    }

    return true;
  }
}

import { Request } from 'express';
import { JwtPayloadInterface } from './jwtPayload.interface';

export interface ReqUserInterface extends Request {
  user: JwtPayloadInterface;
}

import { Request } from 'express';
import { User } from '../../user/user.entity';

export interface ReqUserInterface extends Request {
  user: User;
}

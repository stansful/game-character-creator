import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConfiguration, ConfigTypes } from '../config/apiConfiguration';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  constructor(
    private readonly configService: ConfigService<ApiConfiguration>,
  ) {}

  public async hashPassword(password: string): Promise<string> {
    const saltOrRound = this.configService.get(
      ConfigTypes.BCRYPT_SALT_OR_ROUNDS,
    );
    return bcrypt.hash(password, saltOrRound);
  }

  public async comparePasswords(
    password: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}

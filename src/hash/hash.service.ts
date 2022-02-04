import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Configuration } from '../config/interfaces/configuration.interface';
import { ConfigurationTypes } from '../config/enums/configurationTypes.enum';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService<Configuration>) {}

  public async hashPassword(password: string): Promise<string> {
    const saltOrRound = this.configService.get(
      ConfigurationTypes.BCRYPT_SALT_OR_ROUNDS,
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

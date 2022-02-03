import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiConfiguration, ConfigTypes } from './apiConfiguration';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(
    private readonly configService: ConfigService<ApiConfiguration>,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get(ConfigTypes.JWT_SECRET),
      signOptions: {
        expiresIn: this.configService.get(ConfigTypes.JWT_EXPIRATION_TIME),
      },
    };
  }
}

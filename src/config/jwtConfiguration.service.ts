import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './interfaces/configuration.interface';
import { ConfigurationTypes } from './enums/configurationTypes.enum';

@Injectable()
export class JwtConfigurationService implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService<Configuration>) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get(ConfigurationTypes.JWT_ACCESS_SECRET),
      signOptions: {
        expiresIn: this.configService.get(
          ConfigurationTypes.JWT_ACCESS_EXPIRATION_TIME,
        ),
      },
    };
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmConfigurationService } from './typeOrmConfiguration.service';
import { JwtConfigurationService } from './jwtConfiguration.service';
import { customConfiguration } from './customConfiguration';
import { Configuration } from './interfaces/configuration.interface';
import { ConfigurationTypes } from './enums/configurationTypes.enum';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env.dev',
      load: [customConfiguration],
      validationSchema: Joi.object<Configuration>({
        [ConfigurationTypes.PORT]: Joi.number().required(),
        [ConfigurationTypes.POSTGRES_HOST]: Joi.string().required(),
        [ConfigurationTypes.POSTGRES_PORT]: Joi.number().required(),
        [ConfigurationTypes.POSTGRES_USER]: Joi.string().required(),
        [ConfigurationTypes.POSTGRES_PASSWORD]: Joi.string().required(),
        [ConfigurationTypes.POSTGRES_DB]: Joi.string().required(),
        [ConfigurationTypes.BCRYPT_SALT_OR_ROUNDS]: Joi.number().required(),
        [ConfigurationTypes.JWT_ACCESS_SECRET]: Joi.string().required(),
        [ConfigurationTypes.JWT_REFRESH_SECRET]: Joi.string().required(),
        [ConfigurationTypes.JWT_ACCESS_EXPIRATION_TIME]:
          Joi.number().required(),
        [ConfigurationTypes.JWT_REFRESH_EXPIRATION_TIME]:
          Joi.string().required(),
      }),
    }),
  ],
  providers: [TypeOrmConfigurationService, JwtConfigurationService],
  exports: [TypeOrmConfigurationService, JwtConfigurationService],
})
export class ConfigurationModule {}

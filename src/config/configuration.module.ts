import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiConfiguration, config, ConfigTypes } from './apiConfiguration';
import * as Joi from 'joi';
import { TypeOrmConfigService } from './typeOrmConfig.service';
import { JwtConfigService } from './jwtConfig.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env.dev',
      load: [config],
      validationSchema: Joi.object<ApiConfiguration>({
        [ConfigTypes.PORT]: Joi.number().required(),
        [ConfigTypes.POSTGRES_HOST]: Joi.string().required(),
        [ConfigTypes.POSTGRES_PORT]: Joi.number().required(),
        [ConfigTypes.POSTGRES_USER]: Joi.string().required(),
        [ConfigTypes.POSTGRES_PASSWORD]: Joi.string().required(),
        [ConfigTypes.POSTGRES_DB]: Joi.string().required(),
        [ConfigTypes.BCRYPT_SALT_OR_ROUNDS]: Joi.number().required(),
        [ConfigTypes.JWT_SECRET]: Joi.string().required(),
        [ConfigTypes.JWT_EXPIRATION_TIME]: Joi.number().required(),
      }),
    }),
  ],
  providers: [TypeOrmConfigService, JwtConfigService],
  exports: [TypeOrmConfigService, JwtConfigService],
})
export class ConfigurationModule {}

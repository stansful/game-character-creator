import { ConfigFactory } from '@nestjs/config';
import { ConfigurationTypes } from './enums/configurationTypes.enum';
import { Configuration } from './interfaces/configuration.interface';

export const customConfiguration: ConfigFactory<Configuration> = () => ({
  [ConfigurationTypes.PORT]: Number(process.env.PORT),

  [ConfigurationTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ConfigurationTypes.POSTGRES_PORT]: Number(process.env.POSTGRES_PORT),
  [ConfigurationTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ConfigurationTypes.POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [ConfigurationTypes.POSTGRES_DB]: process.env.POSTGRES_DB,

  [ConfigurationTypes.BCRYPT_SALT_OR_ROUNDS]: Number(
    process.env.BCRYPT_SALT_OR_ROUNDS,
  ),

  [ConfigurationTypes.JWT_ACCESS_SECRET]: process.env.JWT_ACCESS_SECRET,
  [ConfigurationTypes.JWT_REFRESH_SECRET]: process.env.JWT_REFRESH_SECRET,
  [ConfigurationTypes.JWT_ACCESS_EXPIRATION_TIME]: Number(
    process.env.JWT_ACCESS_EXPIRATION_TIME,
  ),
  [ConfigurationTypes.JWT_REFRESH_EXPIRATION_TIME]:
    process.env.JWT_REFRESH_EXPIRATION_TIME,

  [ConfigurationTypes.SMTP_HOST]: process.env.SMTP_HOST,
  [ConfigurationTypes.SMTP_PORT]: Number(process.env.SMTP_PORT),
  [ConfigurationTypes.SMTP_USER]: process.env.SMTP_USER,
  [ConfigurationTypes.SMTP_PASSWORD]: process.env.SMTP_PASSWORD,
});

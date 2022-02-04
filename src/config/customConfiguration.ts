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

  [ConfigurationTypes.JWT_SECRET]: process.env.JWT_SECRET,
  [ConfigurationTypes.JWT_EXPIRATION_TIME]: Number(
    process.env.JWT_EXPIRATION_TIME,
  ),
});

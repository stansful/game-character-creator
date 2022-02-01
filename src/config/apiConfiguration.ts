import { ConfigFactory } from '@nestjs/config';

export enum ConfigTypes {
  PORT = 'PORT',

  POSTGRES_HOST = 'POSTGRES_HOST',
  POSTGRES_PORT = 'POSTGRES_PORT',
  POSTGRES_USER = 'POSTGRES_USER',
  POSTGRES_PASSWORD = 'POSTGRES_PASSWORD',
  POSTGRES_DB = 'POSTGRES_DB',

  BCRYPT_SALT_OR_ROUNDS = 'BCRYPT_SALT_OR_ROUNDS',

  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRATION_TIME = 'JWT_EXPIRATION_TIME',
}

export interface ApiConfiguration {
  [ConfigTypes.PORT]: number;

  [ConfigTypes.POSTGRES_HOST]: string;
  [ConfigTypes.POSTGRES_PORT]: number;
  [ConfigTypes.POSTGRES_USER]: string;
  [ConfigTypes.POSTGRES_PASSWORD]: string;
  [ConfigTypes.POSTGRES_DB]: string;

  [ConfigTypes.BCRYPT_SALT_OR_ROUNDS]: number;

  [ConfigTypes.JWT_SECRET]: string;
  [ConfigTypes.JWT_EXPIRATION_TIME]: number;
}

export const config: ConfigFactory<ApiConfiguration> = () => ({
  [ConfigTypes.PORT]: Number(process.env.PORT),

  [ConfigTypes.POSTGRES_HOST]: process.env.POSTGRES_HOST,
  [ConfigTypes.POSTGRES_PORT]: Number(process.env.POSTGRES_PORT),
  [ConfigTypes.POSTGRES_USER]: process.env.POSTGRES_USER,
  [ConfigTypes.POSTGRES_PASSWORD]: process.env.POSTGRES_PASSWORD,
  [ConfigTypes.POSTGRES_DB]: process.env.POSTGRES_DB,

  [ConfigTypes.BCRYPT_SALT_OR_ROUNDS]: Number(
    process.env.BCRYPT_SALT_OR_ROUNDS,
  ),

  [ConfigTypes.JWT_SECRET]: process.env.JWT_SECRET,
  [ConfigTypes.JWT_EXPIRATION_TIME]: Number(process.env.JWT_EXPIRATION_TIME),
});

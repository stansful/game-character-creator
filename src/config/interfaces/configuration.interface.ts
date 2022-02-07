import { ConfigurationTypes } from '../enums/configurationTypes.enum';

export interface Configuration {
  [ConfigurationTypes.PORT]: number;

  [ConfigurationTypes.POSTGRES_HOST]: string;
  [ConfigurationTypes.POSTGRES_PORT]: number;
  [ConfigurationTypes.POSTGRES_USER]: string;
  [ConfigurationTypes.POSTGRES_PASSWORD]: string;
  [ConfigurationTypes.POSTGRES_DB]: string;

  [ConfigurationTypes.BCRYPT_SALT_OR_ROUNDS]: number;

  [ConfigurationTypes.JWT_ACCESS_SECRET]: string;
  [ConfigurationTypes.JWT_REFRESH_SECRET]: string;
  [ConfigurationTypes.JWT_ACCESS_EXPIRATION_TIME]: number;
  [ConfigurationTypes.JWT_REFRESH_EXPIRATION_TIME]: string;
}

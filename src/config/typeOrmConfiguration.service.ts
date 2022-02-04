import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './interfaces/configuration.interface';
import { ConfigurationTypes } from './enums/configurationTypes.enum';

@Injectable()
export class TypeOrmConfigurationService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Configuration>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(ConfigurationTypes.POSTGRES_HOST),
      port: this.configService.get(ConfigurationTypes.POSTGRES_PORT),
      username: this.configService.get(ConfigurationTypes.POSTGRES_USER),
      password: this.configService.get(ConfigurationTypes.POSTGRES_PASSWORD),
      database: this.configService.get(ConfigurationTypes.POSTGRES_DB),
      entities: ['dist/**/*.entity{ .ts,.js}'],
      // synchronize: true will reset db
      synchronize: true,
    };
  }
}

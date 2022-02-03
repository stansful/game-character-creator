import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { ApiConfiguration, ConfigTypes } from './apiConfiguration';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService<ApiConfiguration>,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get(ConfigTypes.POSTGRES_HOST),
      port: this.configService.get(ConfigTypes.POSTGRES_PORT),
      username: this.configService.get(ConfigTypes.POSTGRES_USER),
      password: this.configService.get(ConfigTypes.POSTGRES_PASSWORD),
      database: this.configService.get(ConfigTypes.POSTGRES_DB),
      entities: ['dist/**/*.entity{ .ts,.js}'],
      // synchronize: true will reset db
      synchronize: true,
    };
  }
}

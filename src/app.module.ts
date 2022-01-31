import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { HashModule } from './hash/hash.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './config/typeOrmConfig.service';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    HashModule,
  ],
})
export class AppModule {}

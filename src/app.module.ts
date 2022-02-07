import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { UserModule } from './user/user.module';
import { HashModule } from './hash/hash.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigurationService } from './config/typeOrmConfiguration.service';
import { AuthModule } from './auth/auth.module';
import { CharacterModule } from './character/character.module';
import { MailModule } from './mail/mail.module';
import { UuidModule } from './uuid/uuid.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigurationService,
    }),
    UserModule,
    HashModule,
    AuthModule,
    CharacterModule,
    MailModule,
    UuidModule,
  ],
})
export class AppModule {}

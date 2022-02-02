import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}

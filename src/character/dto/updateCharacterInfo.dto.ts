import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './createCharacter.dto';

export class UpdateCharacterInfoDto extends PartialType(CreateCharacterDto) {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { PatchCharacterDto } from './dto/patchCharacter.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private userService: UserService,
  ) {}

  async createCharacter(characterDto: CreateCharacterDto, id: number) {
    const user = await this.userService.getById(id);

    const newCharacter = this.characterRepository.create({
      ...characterDto,
      user,
    });

    return this.characterRepository.save(newCharacter);
  }

  getAllCharacters() {
    return Promise.resolve(undefined);
  }

  getCharacterById(id: number) {
    return Promise.resolve(undefined);
  }

  deleteCharacter(id: number) {
    return Promise.resolve(undefined);
  }

  patchCharacter(id: number, patchCharacter: PatchCharacterDto) {
    return Promise.resolve(undefined);
  }
}

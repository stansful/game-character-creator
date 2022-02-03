import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Repository } from 'typeorm';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { UpdateCharacterInfoDto } from './dto/updateCharacterInfo.dto';
import { UpdateCharacterStatsDto } from './dto/updateCharacterStats.dto';
import { User } from '../user/user.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
  ) {}

  public async createCharacter(
    characterDto: CreateCharacterDto,
    user: User,
  ): Promise<Character> {
    const newCharacter = this.characterRepository.create({
      ...characterDto,
      user,
    });

    return this.characterRepository.save(newCharacter);
  }

  public async getMyCharacters(user: User): Promise<Character[]> {
    return this.characterRepository.find({ where: { user } });
  }

  public async getCharacterById(
    characterId: number,
    user: User,
  ): Promise<Character> {
    const characters = await this.characterRepository.find({
      where: { id: characterId, user },
    });

    const character = characters.pop();
    if (!character) {
      throw new NotFoundException(
        `Character with id: ${characterId} not found or belongs to another person`,
      );
    }
    return character;
  }

  public async deleteCharacter(characterId: number, user: User) {
    const character = await this.getCharacterById(characterId, user);
    return this.characterRepository.delete(character.id);
  }

  public async updateCharacterInfo(
    characterId: number,
    user: User,
    updateCharacterInfo: UpdateCharacterInfoDto,
  ) {
    const character = await this.getCharacterById(characterId, user);
    character.characterName = updateCharacterInfo.characterName;
    character.age = updateCharacterInfo.age;
    return this.characterRepository.update({ id: characterId }, character);
  }

  public async updateCharacterStats(
    characterId: number,
    user: User,
    updateCharacterStats: UpdateCharacterStatsDto,
  ) {
    const character = await this.getCharacterById(characterId, user);

    const usedPoints = Object.values(updateCharacterStats).reduce(
      (sum, value) => sum + value,
    );
    if (usedPoints > character.availablePoints) {
      throw new BadRequestException(
        `Not enough points. Available points: ${character.availablePoints}, used: ${usedPoints}`,
      );
    }

    const updatedCharacter = this.increaseCharacterStats(
      updateCharacterStats,
      character,
    );
    updatedCharacter.availablePoints -= usedPoints;

    return this.characterRepository.update(
      { id: characterId },
      updatedCharacter,
    );
  }

  private increaseCharacterStats(
    updateInfo: UpdateCharacterStatsDto,
    character: Character,
  ): Character {
    const statNames = Object.keys(updateInfo);

    statNames.forEach(
      (statName) => (character[statName] += updateInfo[statName]),
    );

    return character;
  }
}

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
  ): Promise<Character[]> {
    return this.characterRepository.find({
      where: { id: characterId, user },
    });
  }

  public async deleteCharacter(
    characterId: number,
    user: User,
  ): Promise<string> {
    const characters = await this.getCharacterById(characterId, user);
    const character = characters.pop();
    if (!character) {
      throw new NotFoundException(
        `Character with id: ${characterId} not found or belongs to another person`,
      );
    }
    await this.characterRepository.delete(characterId);
    return 'Character successfully deleted';
  }

  public async updateCharacterInfo(
    characterId: number,
    user: User,
    updateCharacterInfo: UpdateCharacterInfoDto,
  ) {
    const characters = await this.getCharacterById(characterId, user);
    const character = characters.pop();

    if (updateCharacterInfo.characterName) {
      character.characterName = updateCharacterInfo.characterName;
    }
    if (updateCharacterInfo.age) {
      character.age = updateCharacterInfo.age;
    }

    return this.characterRepository.update({ id: characterId }, character);
  }

  public async updateCharacterStats(
    characterId: number,
    user: User,
    updateCharacterStats: UpdateCharacterStatsDto,
  ) {
    const characters = await this.getCharacterById(characterId, user);
    const character = characters.pop();

    const usedPoints = Object.values(updateCharacterStats).reduce(
      (sum, value) => sum + value,
    );

    if (usedPoints > character.availablePoints) {
      throw new BadRequestException(
        `Not enough points. Available points: ${character.availablePoints}, used: ${usedPoints}`,
      );
    }

    character.availablePoints -= usedPoints;

    const updatedCharacter = this.increaseCharacterStats(
      updateCharacterStats,
      character,
    );

    return this.characterRepository.update(
      { id: characterId },
      updatedCharacter,
    );
  }

  // TODO: find another way to do this?..
  private increaseCharacterStats<UpdateType>(
    updateInfo: UpdateType,
    character: Character,
  ): Character {
    const statNames = Object.keys(updateInfo);

    statNames.forEach(
      (statName) => (character[statName] += updateInfo[statName]),
    );

    return character;
  }
}

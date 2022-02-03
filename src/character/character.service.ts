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
import { UserService } from '../user/user.service';
import { UpdateCharacterStatsDto } from './dto/updateCharacterStats.dto';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    private userService: UserService,
  ) {}

  public async createCharacter(
    characterDto: CreateCharacterDto,
    id: number,
  ): Promise<Character> {
    const user = await this.userService.getById(id);

    const newCharacter = this.characterRepository.create({
      ...characterDto,
      user,
    });

    return this.characterRepository.save(newCharacter);
  }

  public async getMyCharacters(id: number): Promise<Character[]> {
    const user = await this.userService.getById(id);
    return this.characterRepository.find({ where: { user } });
  }

  public async getCharacterById(
    characterId: number,
    userId: number,
  ): Promise<Character[]> {
    const user = await this.userService.getById(userId);
    return this.characterRepository.find({
      where: { id: characterId, user },
    });
  }

  public async deleteCharacter(
    characterId: number,
    userId: number,
  ): Promise<string> {
    const characters = await this.getCharacterById(characterId, userId);
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
    userId: number,
    updateCharacterInfo: UpdateCharacterInfoDto,
  ) {
    const characters = await this.getCharacterById(characterId, userId);
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
    userId: number,
    updateCharacterStats: UpdateCharacterStatsDto,
  ) {
    const characters = await this.getCharacterById(characterId, userId);
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { PatchCharacterDto } from './dto/patchCharacter.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserInterface } from '../auth/interfaces/reqUser.interface';

@UseGuards(JwtGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async getAll() {
    return this.characterService.getAllCharacters();
  }

  @Get()
  async getOne(@Param(':id') id: number) {
    return this.characterService.getCharacterById(id);
  }

  @Post()
  async create(
    @Body() createCharacter: CreateCharacterDto,
    @Req() req: ReqUserInterface,
  ) {
    return this.characterService.createCharacter(createCharacter, req.user.id);
  }

  @Delete()
  async delete(@Param(':id') id: number) {
    return this.characterService.deleteCharacter(id);
  }

  @Patch()
  async patch(
    @Param(':id') id: number,
    @Body() patchCharacter: PatchCharacterDto,
  ) {
    return this.characterService.patchCharacter(id, patchCharacter);
  }
}

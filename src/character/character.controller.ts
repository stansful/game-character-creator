import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/createCharacter.dto';
import { UpdateCharacterInfoDto } from './dto/updateCharacterInfo.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ReqUserInterface } from '../auth/interfaces/reqUser.interface';
import { UpdateCharacterStatsDto } from './dto/updateCharacterStats.dto';

@UseGuards(JwtGuard)
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  async getAll(@Req() req: ReqUserInterface) {
    return this.characterService.getMyCharacters(req.user);
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @Req() req: ReqUserInterface) {
    return this.characterService.getCharacterById(id, req.user);
  }

  @Post()
  async create(
    @Body() createCharacter: CreateCharacterDto,
    @Req() req: ReqUserInterface,
  ) {
    return this.characterService.createCharacter(createCharacter, req.user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: ReqUserInterface) {
    return this.characterService.deleteCharacter(id, req.user);
  }

  @Put(':id')
  async updateInfo(
    @Param('id') id: number,
    @Body() patchCharacter: UpdateCharacterInfoDto,
    @Req() req: ReqUserInterface,
  ) {
    return this.characterService.updateCharacterInfo(
      id,
      req.user,
      patchCharacter,
    );
  }

  @Patch(':id')
  async updateStats(
    @Param('id') id: number,
    @Body() updateCharacterStats: UpdateCharacterStatsDto,
    @Req() req: ReqUserInterface,
  ) {
    return this.characterService.updateCharacterStats(
      id,
      req.user,
      updateCharacterStats,
    );
  }
}

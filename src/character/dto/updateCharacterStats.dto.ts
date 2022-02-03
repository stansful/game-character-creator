import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCharacterStatsDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  sprinting: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  lightFooted: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sneaking: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  firstAid: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  cooking: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  farming: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fishing: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  mechanics: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  electrical: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  metalWorking: number;
}

import { Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @MinLength(2)
  @MaxLength(20)
  characterName: string;

  @Min(15)
  @Max(99)
  age: number;
}

import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

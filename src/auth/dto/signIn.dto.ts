import { OmitType } from '@nestjs/mapped-types';
import { SignUpDto } from './signUp.dto';

export class SignInDto extends OmitType(SignUpDto, ['email'] as const) {}

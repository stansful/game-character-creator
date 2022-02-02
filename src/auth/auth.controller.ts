import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { ReqUserInterface } from './interfaces/reqUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtGuard)
  @Get()
  async giveMeMyJwtInfo(@Req() req: ReqUserInterface) {
    return req.user;
  }

  @Post('signUp')
  async registration(@Body() signUp: SignUpDto) {
    return this.authService.signUp(signUp);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.authService.signIn(signInDto);
    res.cookie('authorization', `Bearer ${access_token}`, { httpOnly: true });
    return { msg: 'OK' };
  }
}

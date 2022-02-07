import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwtRefresh.guard';
import { ReqUserInterface } from './interfaces/reqUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signUp')
  async signUp(@Body() signUp: SignUpDto) {
    return this.authService.signUp(signUp);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  async logIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.signIn(signInDto);

    res.cookie('access_token', `Bearer ${tokens.access_token}`, {
      httpOnly: true,
    });
    res.cookie('refresh_token', `Bearer ${tokens.access_token}`, {
      httpOnly: true,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', ``, { httpOnly: true });
    res.cookie('refresh_token', ``, { httpOnly: true });
  }

  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refreshTokens(
    @Req() req: ReqUserInterface,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(req.user);
    res.cookie('access_token', `Bearer ${tokens.access_token}`, {
      httpOnly: true,
    });
    res.cookie('refresh_token', `Bearer ${tokens.access_token}`, {
      httpOnly: true,
    });
  }
}

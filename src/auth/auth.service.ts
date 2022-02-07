import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { SignInDto } from './dto/signIn.dto';
import { User } from '../user/user.entity';
import { TokensInterface } from './interfaces/tokens.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigurationTypes } from '../config/enums/configurationTypes.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  async refreshToken(user: User) {
    return this.generateTokens(user);
  }

  public async signUp(signUp: SignUpDto): Promise<User> {
    return this.userService.create(signUp);
  }

  public async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.validateUser(username, password);
    return this.generateTokens(user);
  }

  private async generateTokens(user: User): Promise<TokensInterface> {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get(ConfigurationTypes.JWT_REFRESH_SECRET),
        expiresIn: this.configService.get(
          ConfigurationTypes.JWT_REFRESH_EXPIRATION_TIME,
        ),
      }),
    ]);
    return { access_token, refresh_token };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.userService.getByUsername(username);
    if (!user) {
      throw new ForbiddenException('invalid username or password');
    }
    const passwordMatch = await this.hashService.comparePasswords(
      password,
      user.password,
    );
    if (!passwordMatch) {
      throw new ForbiddenException('invalid username or password');
    }
    return user;
  }
}

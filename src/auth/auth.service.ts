import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { SignInDto } from './dto/signIn.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  public async signUp(signUp: SignUpDto): Promise<User> {
    return this.userService.create(signUp);
  }

  public async signIn(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.validateUser(username, password);
    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return this.jwtService.signAsync(payload);
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

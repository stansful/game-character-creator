import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    const { username, email } = userDto;

    const existingUsername = await this.getByUsername(username);
    if (existingUsername) {
      throw new BadRequestException('Username already exist');
    }
    const existingEmail = await this.getByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email already exist');
    }

    const password = await this.hashService.hashPassword(userDto.password);

    const newUser = this.userRepository.create({
      ...userDto,
      password,
    });
    return this.userRepository.save(newUser);
  }

  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} does not exist`);
    }
    return user;
  }

  public async getByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }

  public async getByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }
}

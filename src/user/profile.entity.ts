import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Gender } from './enums/gender.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileName: string;

  @Column({
    type: 'enum',
    enum: [Gender.ALIEN, Gender.MALE, Gender.FEMALE],
    default: Gender.ALIEN,
  })
  gender: string;

  @Column()
  aboutMe: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

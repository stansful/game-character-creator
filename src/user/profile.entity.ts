import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileName: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'alien'], default: 'alien' })
  gender: string;

  @Column()
  aboutMe: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

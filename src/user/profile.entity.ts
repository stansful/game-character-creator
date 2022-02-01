import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  profileName: string;

  @Column({ enum: ['male', 'female', 'alien'] })
  gender: string;

  @Column()
  aboutMe: string;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  user: User;
}

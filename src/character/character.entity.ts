import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  characterName: string;

  @Column()
  age: number;

  @Column({ default: 10 })
  availablePoints: number;

  @Column({ default: 0 })
  sprinting: number;

  @Column({ default: 0 })
  lightFooted: number;

  @Column({ default: 0 })
  sneaking: number;

  @Column({ default: 0 })
  firstAid: number;

  @Column({ default: 0 })
  cooking: number;

  @Column({ default: 0 })
  farming: number;

  @Column({ default: 0 })
  fishing: number;

  @Column({ default: 0 })
  mechanics: number;

  @Column({ default: 0 })
  electrical: number;

  @Column({ default: 0 })
  metalWorking: number;

  @ManyToOne(() => User, (user) => user.characters)
  user: User;
}

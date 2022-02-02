import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  characterName: string;

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
}

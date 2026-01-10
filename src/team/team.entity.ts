import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamMember } from './teamMember.entity';
import { Tasks } from 'src/task/task.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TeamMember, (tm: TeamMember) => tm.team)
  teamMembers: TeamMember[];

  @OneToMany(() => Tasks, (task: Tasks) => task.team)
  tasks: Tasks[];
}

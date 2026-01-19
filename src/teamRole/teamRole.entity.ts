import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TeamRoleAssign } from './teamRole.assign.entity';
import { Team } from '../team/team.entity';

@Entity('team_roles')
@Unique(['name', 'team'])
export class TeamRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TeamRoleAssign, (ra: TeamRoleAssign) => ra.role)
  roleAssignments: TeamRoleAssign[];

  @ManyToOne(() => Team, (team) => team.teamRoles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'team_id' })
  team: Team;
}

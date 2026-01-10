import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { TeamRoleAssign } from './teamRole.assign.entity';
import { Team } from 'src/team/team.entity';

@Entity('team_roles')
@Unique(['name'])
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

  @ManyToMany(() => Team, (t: Team) => t.id)
  teamId: number;
}

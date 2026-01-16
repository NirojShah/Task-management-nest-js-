import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { TeamRoles } from './teamRole.entity';

@Entity('team_role_assignments')
@Unique(['user', 'role']) // prevent duplicate role assignment
export class TeamRoleAssign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.teamRoleAssign, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TeamRoles, (role) => role.roleAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'team_role_id' })
  role: TeamRoles;

  @CreateDateColumn()
  assignedAt: Date;
}

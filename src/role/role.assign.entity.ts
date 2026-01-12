import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Roles } from './role.entity';

@Entity('role_assignments')
@Unique(['user', 'role']) // prevent duplicate role assignment
export class RoleAssign {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.roleAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Roles, role => role.roleAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Roles;

  @CreateDateColumn()
  assignedAt: Date;
}

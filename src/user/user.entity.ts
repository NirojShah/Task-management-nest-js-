import { RoleAssign } from 'src/role/role.assign.entity';
import { Tasks } from 'src/task/task.entity';
import { TeamMember } from 'src/team/teamMember.entity';
import { TeamRoleAssign } from 'src/teamRole/teamRole.assign.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNo: string;

  @Column()
  gender: string;

  @Column()
  password: string;

  @OneToMany(() => RoleAssign, (ra: RoleAssign) => ra.user)
  roleAssignments: RoleAssign[];

  @OneToMany(() => TeamMember, (teamMember: TeamMember) => teamMember.user)
  teamMembers: TeamMember[];

  // Tasks assigned to the user
  @OneToMany(() => Tasks, (task: Tasks) => task.user)
  assignedTask: Tasks[];

  // Tasks created by the user
  @OneToMany(() => Tasks, (task) => task.createdBy)
  createdTasks: Tasks[];

  // Tasks asigned by the user
  @OneToMany(() => Tasks, (task) => task.createdBy)
  assignedBy: Tasks[];

  @OneToMany(() => TeamRoleAssign, (tra: TeamRoleAssign) => tra.user)
  teamRoleAssign: TeamRoleAssign[];
}

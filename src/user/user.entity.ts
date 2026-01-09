import { RoleAssign } from 'src/role/role.assign.entity';
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
} 

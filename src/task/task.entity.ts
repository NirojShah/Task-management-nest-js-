import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatus } from './enums/taskStatus.enum';
import { Team } from 'src/team/team.entity';
import { User } from 'src/user/user.entity';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  taskName: string;

  @Column({ type: 'text' })
  taskDescription: string;

  // @Column()
  // assignedBy: number;
  @ManyToOne(() => User, (user) => user.assignedBy)
  @JoinColumn({ name: 'assignedBy' })
  assignedBy: User;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  hours: number;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;

  @ManyToOne(() => User, (user: User) => user.assignedTask)
  @JoinColumn({ name: 'userId' })
  user: User;

  // Task is CREATED BY this user
  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @ManyToOne(() => Team, (team: Team) => team.tasks)
  @JoinColumn({ name: 'teamId' })
  team: Team;
}

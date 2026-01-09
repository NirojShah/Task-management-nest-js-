import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './enums/taskStatus.enum';

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  taskName: string;

  @Column({ type: 'text' })
  taskDescription: string;

  @Column()
  assignedBy: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  hours: number;

  @Column({
    type:"enum",
    enum:TaskStatus,
    default: TaskStatus.PENDING
  })
  status: TaskStatus;

  @Column()
  userId: number;

  @Column()
  createdBy: number;
}

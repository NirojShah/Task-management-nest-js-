import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsEnum,
  IsString,
  IsInt,
  Min,
} from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Task name is required' })
  taskName: string;

  @IsNotEmpty({ message: 'Task description is required' })
  taskDescription: string;

  // @IsNumber({}, { message: 'AssignedBy must be a number' })
  // assignedBy: number;

  @IsDateString({}, { message: 'Start date must be a valid date' })
  startDate: string;

  @IsDateString({}, { message: 'End date must be a valid date' })
  endDate: string;

  @IsNumber({}, { message: 'Hours must be a number' })
  hours: number;

  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Invalid task status' })
  status?: TaskStatus;
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
export class UpdateTaskDto {
  @IsNumber()
  taskId: number;

  @IsOptional()
  @IsString()
  taskName?: string;

  @IsOptional()
  @IsString()
  taskDescription?: string;

  // Reassign task to another user
  @IsOptional()
  @IsInt()
  userId?: number;

  // Change who assigned the task
  @IsOptional()
  @IsInt()
  assignedBy?: number;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  hours?: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  // Move task to another team
  @IsOptional()
  @IsInt()
  teamId?: number;
}

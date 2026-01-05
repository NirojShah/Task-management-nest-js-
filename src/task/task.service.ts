import { ResponseDto } from 'src/response/response.dto';
import { CreateTaskDto } from './task dto/task.dto';
import { Tasks } from './task.entity';
import { TaskInterface } from './task.interface';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './enums/taskStatus.enum';

@Injectable()
export class TaskService implements TaskInterface {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}
  async createTasks(createTaskDto: CreateTaskDto): Promise<ResponseDto<Tasks>> {
    try {
      const createdTask = this.taskRepository.create({
        ...createTaskDto,
        status: TaskStatus.PENDING,
      });
      const savedTask = await this.taskRepository.save(createdTask);
      return {
        success: true,
        message: 'Task Created successfully',
        data: savedTask,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
  updateTasks(): Promise<ResponseDto<any>> {
    throw new Error('Method not implemented.');
  }
  deleteTask(): Promise<ResponseDto<any>> {
    throw new Error('Method not implemented.');
  }
  getTasks(): Promise<ResponseDto<Tasks[]>> {
    throw new Error('Method not implemented.');
  }
  getTaskById(taskId: number): Promise<ResponseDto<Tasks>> {
    throw new Error('Method not implemented.');
  }
  async updateTaskStatusById(
    taskId: number,
    status: TaskStatus,
  ): Promise<ResponseDto<any>> {
    try {
      const task = await this.taskRepository.findOne({
        where: { taskId },
      });

      if (!task) {
        return {
          success: false,
          message: 'Task not found',
        };
      }

      task.status = status;
      await this.taskRepository.save(task);

      return {
        success: true,
        message: 'Task status updated successfully',
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

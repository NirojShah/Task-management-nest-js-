import { ResponseDto } from 'src/response/response.dto';
import { CreateTaskDto } from './task dto/task.dto';
import { Tasks } from './task.entity';
import { TaskInterface } from './task.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getTasks(
    page: number,
    limit: number,
    userId: number,
  ): Promise<ResponseDto<Tasks[]>> {
    if (!userId) {
      throw new BadRequestException('User Id is required');
    }
    const tasks = await this.taskRepository.find({
      where: {
        userId: userId,
      },
      skip: 10,
    });
    if (tasks) {
      return {
        success: true,
        message: 'tasks found',
        data: tasks,
      };
    }
    return {
      success: false,
      message: 'Tasks not found',
    };
  }
  async getTaskById(taskId: number): Promise<ResponseDto<Tasks>> {
    const task = await this.taskRepository.findOne({
      where: {
        taskId: taskId,
      },
    });
    if (task) {
      return {
        message: 'task found',
        success: true,
        data: task,
      };
    }
    return {
      message: 'task not found',
      success: false,
    };
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

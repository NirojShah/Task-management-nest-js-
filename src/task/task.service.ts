import { ResponseDto } from 'src/response/response.dto';
import { CreateTaskDto } from './task dto/task.dto';
import { Tasks } from './task.entity';
import { TaskInterface } from './task.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './enums/taskStatus.enum';

@Injectable()
export class TaskService implements TaskInterface {
  constructor(
    @InjectRepository(Tasks)
    private taskRepository: Repository<Tasks>,
  ) {}
  async createTasks(
    createTaskDto: CreateTaskDto,
    createdBy: number,
  ): Promise<ResponseDto<Tasks>> {
    try {
      const createdTask = this.taskRepository.create({
        ...createTaskDto,
        createdBy: { userId: createdBy },
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
    throw new Error('implementation pending.');
  }

  async deleteTask(taskId: number, userId: number): Promise<ResponseDto<any>> {
    const task = await this.taskRepository.findOne({
      where: {
        user: { userId: userId },
        taskId: taskId,
      },
    });
    if (!task) {
      throw new NotFoundException(
        `Task ${taskId} not found for the user ${userId}`,
      );
    }
    await this.taskRepository.delete({
      user: { userId: userId },
      taskId: taskId,
    });
    return {
      success: true,
      message: 'task deleted successfully',
    };
  }
  async getTasks(
    page: number = 1,
    limit: number = 10,
    userId: number,
  ): Promise<ResponseDto<Tasks[]>> {
    if (!userId) {
      throw new BadRequestException('User Id is required');
    }

    const skip = (page - 1) * limit;

    const tasks = await this.taskRepository.find({
      where: { user: { userId: userId } },
      skip,
      take: limit,
      order: { taskId: 'DESC' }, // optional but recommended
    });

    if (tasks.length > 0) {
      return {
        success: true,
        message: 'Tasks found',
        data: tasks,
      };
    }

    return {
      success: false,
      message: 'No tasks found',
      data: [],
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
    userId: number,
  ): Promise<ResponseDto<any>> {
    try {
      const task = await this.taskRepository.findOne({
        where: { taskId, user: { userId: userId } },
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

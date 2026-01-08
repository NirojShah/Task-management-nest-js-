import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task dto/task.dto';
import { ResponseDto } from 'src/user/user dto/user.response.dto';
import { Tasks } from './task.entity';
import { TaskStatus } from './enums/taskStatus.enum';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() taskDto: CreateTaskDto,
  ): Promise<ResponseDto<Tasks>> {
    return this.taskService.createTasks(taskDto);
  }

  @Get('/all')
  async getMyTask(
    @Request() req,
    @Query('userId') userId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log({ userId:req.user });
    return this.taskService.getTasks(page, limit, userId);
  }

  @Get('/:id')
  async getTaskById(@Param() id: number) {
    return this.taskService.getTaskById(id);
  }

  @Put('/update-status')
  async updateTaskStatusById(
    @Body() status: TaskStatus,
    taskId: number,
    userId: number,
  ) {
    return this.taskService.updateTaskStatusById(taskId, status, userId);
  }

  @Delete('/:taskId')
  async deleteTask(@Param() taskId: number) {
    return this.taskService.deleteTask(taskId, 2);
  }
}

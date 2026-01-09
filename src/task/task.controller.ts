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
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task dto/task.dto';
import { ResponseDto } from 'src/user/user dto/user.response.dto';
import { Tasks } from './task.entity';
import { TaskStatus } from './enums/taskStatus.enum';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() taskDto: CreateTaskDto,
    @Request() req
  ): Promise<ResponseDto<Tasks>> {
    const createdBy = req.user.userId;
    return this.taskService.createTasks(taskDto,createdBy);
  }

  @Get('/all')
  async getMyTask(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId: number = req.user.userId;
    return this.taskService.getTasks(page, limit, userId);
  }

  @Get('/:taskId')
  async getTaskById(@Param() taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  @Put('/update-status')
  async updateTaskStatusById(
    @Request() req,
    @Body() status: TaskStatus,
    taskId: number,
  ) {
    const userId: number = req.user.userId;
    return this.taskService.updateTaskStatusById(taskId, status, userId);
  }

  @Delete('/:taskId')
  async deleteTask(@Request() req, @Param() taskId: number) {
    const userId: number = req.user.userId;
    return this.taskService.deleteTask(taskId, userId);
  }
}

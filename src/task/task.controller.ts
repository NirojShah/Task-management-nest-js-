import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async getMyTask(@Param() page: number, limit: number, userId: number) {
    return this.taskService.getTasks(page, limit, userId);
  }

  @Get('/:id')
  async getTaskById(@Param() id: number) {
    return this.taskService.getTaskById(id);
  }

  @Post('/update-status')
  async updateTaskStatusById(@Body() status: TaskStatus, taskId: number) {
    return this.taskService.updateTaskStatusById(taskId, status);
  }
}

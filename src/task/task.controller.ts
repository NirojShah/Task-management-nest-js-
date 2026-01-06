import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './task dto/task.dto';
import { ResponseDto } from 'src/user/user dto/user.response.dto';
import { Tasks } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() taskDto: CreateTaskDto,
  ): Promise<ResponseDto<Tasks>> {
    return this.taskService.createTasks(taskDto);
  }

  @Get("/all")
  async getMyTask(@Param() data: any){

  }

  @Get("/id")
  async getTaskById(){

  }

}

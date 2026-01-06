import { ResponseDto } from "src/response/response.dto";
import { Tasks } from "./task.entity";
import { CreateTaskDto } from "./task dto/task.dto";

export interface TaskInterface{
    createTasks(createTaskDto: CreateTaskDto):Promise<ResponseDto<Tasks>>;
    updateTasks(): Promise<ResponseDto<any>>
    deleteTask(): Promise<ResponseDto<any>>
    getTasks(page: number, limit: number): Promise<ResponseDto<Tasks[]>>
    getTaskById(taskId: number): Promise<ResponseDto<Tasks>>
    updateTaskStatusById(taskId: number,status: string): Promise<ResponseDto<any>>
}
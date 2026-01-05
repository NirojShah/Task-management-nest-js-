import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../enums/taskStatus.enum";

export class UpdateStatusDTO{
    @IsNotEmpty({message: "Please send Task Status"})
    status: TaskStatus
}
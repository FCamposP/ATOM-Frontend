import { inject, Injectable } from "@angular/core";
import { GeneralService } from "@core/services/general.service";
import { Observable } from "rxjs";
import { Task } from 'src/app/modules/models/task'
import { IResponseWrapper } from 'src/app/core/models/interfaces/responseWrapperDTO'

@Injectable({ providedIn: 'root' })
export class TaskService {

    private generalService = inject(GeneralService);

    private resource:string="tasks";

    getTasks() : Observable<IResponseWrapper<Task[]>>{ 
        return this.generalService
            .Get(this.resource,"");
    }

    createTask(task: Task): Observable<IResponseWrapper<Task>> {
        return this.generalService
            .Post(this.resource, "", task);
    }
    updateTask(task: Task): Observable<IResponseWrapper<Task>> {
        return this.generalService
            .Put(this.resource, task.id, task);
    }

    deleteTask(taskId: string): Observable<IResponseWrapper<Task>> { 
        return this.generalService
            .Delete(this.resource, taskId);
    }
}

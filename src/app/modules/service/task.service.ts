import { inject, Injectable } from "@angular/core";
import { GeneralService } from "@core/services/general.service";
import { Observable } from "rxjs";
import { Task } from 'src/app/modules/models/interfaces/task'
import { IResponseWrapper } from 'src/app/core/models/interfaces/response-wrapper'

@Injectable({ providedIn: 'root' })
export class TaskService {

    private generalService = inject(GeneralService);

    private resource:string="tasks";

    getTasks() : Observable<IResponseWrapper<Task[]>>{ 
        return this.generalService
            .get(this.resource,"");
    }

    createTask(task: Task): Observable<IResponseWrapper<Task>> {
        return this.generalService
            .post(this.resource, "", task);
    }
    updateTask(task: Task): Observable<IResponseWrapper<Task>> {
        return this.generalService
            .put(this.resource, task.id, task);
    }

    deleteTask(taskId: string): Observable<IResponseWrapper<Task>> { 
        return this.generalService
            .delete(this.resource, taskId);
    }
}

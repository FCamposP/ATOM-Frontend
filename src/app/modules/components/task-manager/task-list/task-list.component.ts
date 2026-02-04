import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/modules/models/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
    ],
    templateUrl: './task-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

    @Input() taskList!: Task[];

    @Output() editTask = new EventEmitter<Task>();
    @Output() deleteTask = new EventEmitter<string>();
    @Output() completeTask = new EventEmitter<Task>();

    constructor() { }

    ngOnInit(): void {

    }

    trackByTaskId(index: number, task: Task): string {
        return task.id;
    }

    onDeleteTask(taskId: string) {
        this.deleteTask.emit(taskId);
    }

    onEditTask(task: Task) {
        this.editTask.emit(task);
    }

    onCheckboxChange(event: any, task: Task) {
        task.completed = !event.checked;
        this.completeTask.emit(task);
    }
}

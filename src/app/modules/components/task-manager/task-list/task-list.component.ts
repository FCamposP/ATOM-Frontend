import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { Task } from 'src/app/modules/models/task';
import { TaskService } from '../service/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { EditorModule } from 'primeng/editor'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';


@Component({
    selector: 'app-task-list',
    standalone:true,
    imports:[
        CommonModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        EditorModule,
        ToastModule,
        AutoCompleteModule,
        AvatarGroupModule,
        CheckboxModule,
        MenuModule,
        DialogModule,
        RippleModule,
        AvatarModule,
    ],
    templateUrl: './task-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

    @Input() taskList!: Task[];

    @Input() title!: string;

    @ViewChild('menu') menu!: Menu;

    menuItems: MenuItem[] = [];

    clickedTask!: Task;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.menuItems = [
            { label: 'Edit', icon: 'pi pi-pencil', command: () => this.onEdit() },
            { label: 'Delete', icon: 'pi pi-trash', command: () => this.handleDelete() }
        ];
    }

    parseDate(date: Date) {
        let d = new Date(date);
        return d.toUTCString().split(' ').slice(1, 3).join(' ');
    }

    handleDelete() {
        this.taskService.removeTask(this.clickedTask.id);
    }

    toggleMenu(event: Event, task: Task) {
        this.clickedTask = task;
        this.menu.toggle(event);
    }

    onEdit() {
        this.taskService.onTaskSelect(this.clickedTask);
        this.taskService.showDialog('Edit Task', false);
    }

    onCheckboxChange(event: any, task: Task) {
        event.originalEvent.stopPropagation();
        task.completed = event.checked;
        this.taskService.markAsCompleted(task);
    }
}

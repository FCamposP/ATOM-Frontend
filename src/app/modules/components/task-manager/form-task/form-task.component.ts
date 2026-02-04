import { Component, OnDestroy, inject, DestroyRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TaskService } from '../../../service/task.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Task } from 'src/app/modules/models/interfaces/task'

@Component({
    selector: 'app-form-task',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CommonModule
    ],
    templateUrl: './form-task.component.html',
    providers: [MessageService]
})
export class FormTaskComponent implements OnDestroy {

    private fb = inject(FormBuilder);
    private ref = inject(DynamicDialogRef);
    private config = inject(DynamicDialogConfig);
    private taskService = inject(TaskService);
    private OnDestroy$ = inject(DestroyRef);

    loading = false;

    task?: Task = this.config.data.task;

    taskForm: FormGroup = this.fb.group({
        title: new FormControl(this.task?.title, [Validators.required, Validators.minLength(3)]),
        description: new FormControl(this.task?.description, [Validators.maxLength(500)]),
    });

    get title() {
        return this.taskForm.get('title')!;
    }

    get description() {
        return this.taskForm.get('description')!;
    }

    onSubmit() {
        if (this.taskForm.invalid) return;

        const taskUpdated = {
            id: this.task?.id,
            ...this.taskForm.value,
        };

        if (this.task?.id) {
            this.taskService.updateTask(taskUpdated)
                .pipe(
                    takeUntilDestroyed(this.OnDestroy$)
                )
                .subscribe({
                    next: () => {
                        this.ref.close(true);
                    },
                    error: (err) => {

                    }
                });
        } else {

            this.taskService.createTask(taskUpdated)
                .pipe(
                    takeUntilDestroyed(this.OnDestroy$)
                )
                .subscribe({
                    next: () => {
                        this.ref.close(true);
                    },
                    error: (err) => {

                    }
                });
        }
    }

    cancelTask() {
        this.taskForm.reset();
        this.ref.close(false);
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
}

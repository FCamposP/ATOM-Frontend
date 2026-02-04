import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component'
import { FormTaskComponent } from './form-task/form-task.component'
import { TaskService } from '../../service/task.service';
import { Task } from 'src/app/modules/models/task';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from '@core/services/alert.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    AccordionModule,
    BadgeModule,
    TaskListComponent,
  ],
  providers: [TaskService, DialogService],

  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})

export class TaskManagerComponent implements OnInit {

  private OnDestroy$ = inject(DestroyRef);
  private dialogService = inject(DialogService);
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private breakpoint = inject(BreakpointObserver);

  ref: DynamicDialogRef | undefined;

  user: string | null = '';

  allTasks: Task[] = [];
  todo: Task[] = [];
  completed: Task[] = [];

  statuses: any = [
    {
      title: 'Todas',
      badgeClass: 'bg-pink-500',
    },
    {
      title: 'Pendientes',
      badgeClass: 'bg-yellow-500',
    },
    {
      title: 'Completadas',
      badgeClass: 'bg-green-500',
    },

  ];
  statusSelected: string = "Todas";

  constructor() {

  }
  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.onGetTaskByUser();
  }

  onGetTaskByUser() {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed(this.OnDestroy$))
      .subscribe({
        next: (value) => {
          if (value.data) {
            this.allTasks = value.data;
            this.refreshLists();
          }
        },
        error: (error) => {

        }
      });
  }

  refreshLists() {
    this.todo = this.allTasks.filter(x => !x.completed);
    this.completed = this.allTasks.filter(x => x.completed);
  }

  onSelectStatus(status: string) {
    this.statusSelected = status;
  }

  ngOnDestroy() {

  }

  onCompleteTask(task: Task) {
    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    this.taskService.updateTask(updatedTask)
      .pipe(
        takeUntilDestroyed(this.OnDestroy$)
      )
      .subscribe({
        next: () => {
          if (updatedTask.completed) {
            this.alertService.showTopEnd("success", "Registro completado");
          }
          this.allTasks = this.allTasks.map(t =>
            t.id === updatedTask.id ? updatedTask : t
          );
          this.refreshLists();
        },
        error: (err) => {

        }
      });
  }

  onDeleteTask(taskId: string) {
    Swal.fire({
      title: "",
      text: "¿Realmente desea eliminar la tarea seleccionada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId)
          .pipe(
            takeUntilDestroyed(this.OnDestroy$)
          )
          .subscribe({
            next: () => {
              this.alertService.showTopEnd("success", "Registro eliminado con éxito");
              this.allTasks = this.allTasks.filter(t => t.id !== taskId);
              this.refreshLists();
            },
            error: (err) => {

            }
          });;
      }
    });
  }

  openFormTask(task?: Task) {
    this.breakpoint.observe(['(max-width: 768px)'])
      .subscribe(result => {
        const isMobile = result.matches;

        this.ref = this.dialogService.open(
          FormTaskComponent,
          {
            header: task ? "Editar tarea" : "Nueva tarea",
            width: isMobile ? '100vw' : '50%',
            height: isMobile ? '100vh' : 'auto',
            maximizable: true,
            closable: false,
            dismissableMask: false,
            closeOnEscape: false,
            data: {
              task
            },
          }
        );
        this.ref.onClose
          .pipe(takeUntilDestroyed(this.OnDestroy$))
          .subscribe((saved) => {
            if (saved) {
              this.alertService.showTopEnd("success", "Registro " + (task ? "actualizado" : "creado") + " con éxito");
              this.onGetTaskByUser();
            }
          });
      });
  }

  logout() {
    Swal.fire({
      title: "",
      text: "¿Realmente desea cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff6600",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}

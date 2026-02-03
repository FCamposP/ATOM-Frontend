import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component'
import { CreateTaskComponent } from './create-task/create-task.component'
import { Subscription } from 'rxjs';
import { TaskService } from './service/task.service';
import { Task } from 'src/app/modules/models/task';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralService } from '@core/services/general.service';

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
    CreateTaskComponent,
    RouterModule

  ],
  providers: [TaskService],

  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})

export default class TaskManagerComponent implements OnInit {

  private OnDestroy$ = inject(DestroyRef);

  private service = inject(GeneralService);


  subscription: Subscription;
  selectedTeam: string = 'Todas';

  todo: Task[] = [];

  completed: Task[] = [];

  filteredTeamMembers: any = [];

  teams: any = [
    {
      title: 'Todas',
      avatarText: '+4',
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

  constructor(private taskService: TaskService) {
    this.subscription = this.taskService.taskSource$.subscribe(data => this.categorize(data));
  }
  ngOnInit(): void {
    this.service.Get
  }

  categorize(tasks: Task[]) {
    this.todo = tasks.filter(t => t.completed !== true);
    this.completed = tasks.filter(t => t.completed);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showDialog() {
    this.taskService.showDialog('Detalle de Tarea', true);
  }

  teamFilter(team: string) {
    this.selectedTeam = team;

  }

}

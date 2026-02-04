import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';
import {loginGuard} from 'src/app/core/guards/login.guard';
import {authGuard} from 'src/app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () =>import('./modules/components/public/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        children: [
            {
                path: '',
                component: AppLayoutComponent,
                canActivate: [authGuard],
                children: [
                    {
                        path: '',
                        data: { breadcrumb: '' },
                        loadComponent: () =>
                            import('./modules/components/task-manager/task-manager.component').then((m) => m.TaskManagerComponent),
                    },
                ],
            },

        ],
    },
    {
        path: '**',
        redirectTo: '',
    }
];

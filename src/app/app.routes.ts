import { AuthGuard } from './core/guards/auth.guard';
import { externalRedirectGuard } from './core/guards/redirect.guard';
import { Routes } from '@angular/router';
import { AppLayoutComponent } from './core/layout/app.layout.component';


export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'login',
                loadComponent: () => import("./modules/components/public/login/login.component").then((m) => m.LoginComponent)
            },
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: '',
                        data: { breadcrumb: '' },
                        loadComponent: () =>
                            import(
                                './modules/components/task-manager/task-manager.component'
                            ),
                    },
                ],
                // canActivate: [loggedGuard]
            },

        ],
    },
];

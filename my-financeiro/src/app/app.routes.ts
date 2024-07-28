import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'sistema',
        loadChildren: () => import('./pages/sistema/sistema.module').then(m => m.SistemaModule)
    },
    {
        path: 'categoria',
        loadChildren: () => import('./pages/categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'despesa',
        loadChildren: () => import('./pages/despesa/despesa.module').then(m => m.DespesaModule)
    }
];

import { Routes } from '@angular/router';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { AuthComponent } from './pages/auth/auth.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'statistics',
        component: StatisticsComponent
    },
    {
        path: '**',
        redirectTo: '/calculator',
        pathMatch: 'full',
      }
];

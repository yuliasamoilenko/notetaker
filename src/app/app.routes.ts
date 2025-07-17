import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/components//dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      {
    path: 'new-note',
    loadComponent: () =>
      import('./dashboard/components/unititled-notes/unititled-notes').then(m => m.UnititledNotes),
    canActivate: [AuthGuard]
  },
    { path: '**', redirectTo: ''}
];

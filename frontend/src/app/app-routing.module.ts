// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './Features/manage-users/manage-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard/homepage', pathMatch: 'full' },  // Default route
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },  // Lazy load Auth Module
  { path: 'dashboard', loadChildren: () => import('./Features/dashboard.module').then(m => m.DashboardModule) },  // Lazy load Dashboard Module
  { path: '**', redirectTo: '/auth/login' } , // Fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// src/app/Features/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from '../auth/auth.guard';
import { ReportsComponent } from './reports/reports.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RecyclingDataComponent } from './recycling-data/recycling-data.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent ,canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent ,canActivate: [AuthGuard] },
  {path:'homepage',component:HomePageComponent},
  {path:'helppage',component:HelpPageComponent},
  {path:'About-Us',component:AboutusComponent},
  {path:'DataSpce',component:RecyclingDataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

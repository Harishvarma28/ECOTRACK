// src/app/Features/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DialogComponent } from './dialog/dialog.component'; // Uncomment this import
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth.interceptor';
import { LoaderInterceptor } from '../auth/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { ReportsComponent } from './reports/reports.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RecyclingDataComponent } from './recycling-data/recycling-data.component';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToastService } from './services/toast.service';


@NgModule({
  declarations: [
    DashboardComponent,
    DialogComponent,
    ManageUsersComponent,
    UserDialogComponent,
    LoaderComponent,
    ReportsComponent,
    HomePageComponent,
    HelpPageComponent,
    AboutusComponent,
    RecyclingDataComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    AuthModule ,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule

  ],
  exports: [
    DashboardComponent,
    ManageUsersComponent,
    UserDialogComponent,
    LoaderComponent,
    HomePageComponent,
    AboutusComponent,
    RecyclingDataComponent,

  ],

})
export class DashboardModule { }

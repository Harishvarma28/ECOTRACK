// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule,provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { DialogComponent } from './Features/dialog/dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // NavComponent can stay in AppModule
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoaderInterceptor } from './auth/loader.interceptor';
import { DashboardModule } from './Features/dashboard.module';

import { ToastrModule } from 'ngx-toastr';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    // DialogComponent,  // Other shared components can stay here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      // positionClass: 'toast-top-right',
      // timeOut: 3000,
      // preventDuplicates: true,
    }),
  
  
  ],
  providers: [AuthService,{ provide:HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi:true}, {provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true,}],
  bootstrap: [AppComponent]
})
export class AppModule { }

// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auh-routing.module';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ChangepasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule ,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports:[
    LoginComponent,
    SignupComponent,
    ChangepasswordComponent
  ]
})
export class AuthModule { }

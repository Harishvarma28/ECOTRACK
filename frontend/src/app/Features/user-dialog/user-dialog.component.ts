import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  name: string;
  email: string;  // Changed contact to email
  university: string;
  status: string;
  role: string;   // Added role field
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string; user?: User },
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: [data.user?.name || '', [Validators.required]],
      email: [data.user?.email || '', [Validators.required, Validators.email]],  // Changed contact to email
      university: [data.user?.university || '', [Validators.required]],
      status: [data.user?.status || 'Active'],
      role: [data.user?.role || 'User']  // Added role selection
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const userData = this.userForm.value; // Retrieve form data

    if (this.data.action === 'add') {
      this.userService.addUser(userData).subscribe(newUser => {
        this.dialogRef.close(newUser); // Close dialog with new user data
      });
    } else if (this.data.action === 'edit') {
      this.userService.editUser(userData).subscribe(updatedUser => {
        this.dialogRef.close(updatedUser); // Close dialog with updated user data
      });
    } else if (this.data.action === 'delete') {
      this.userService.deleteUser(this.data.user!.email).subscribe(() => {
        this.dialogRef.close(this.data.user); // Close dialog with deleted user data
      });
    }
  }
}

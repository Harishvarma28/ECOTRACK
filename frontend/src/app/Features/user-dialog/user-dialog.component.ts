import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';


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
    private fb: FormBuilder,
    private toastr: ToastService
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

    // Perform action based on the action type (add, edit, delete)
    if (this.data.action === 'add') {
      if (this.userForm.valid) {
        this.userService.addUser(userData).subscribe(newUser => {
          this.toastr.success('User added successfully!');  // Success Toast
          this.dialogRef.close(newUser); // Close dialog with new user data
        }, error => {
          this.toastr.error('Error adding user: ' + error.message);  // Error Toast
        });
      } else {
        this.userForm.markAllAsTouched(); // Trigger form validation
      }
    } else if (this.data.action === 'edit') {
      if (this.userForm.valid) {
        this.userService.editUser(userData).subscribe(updatedUser => {
          this.toastr.success('User updated successfully!');  // Success Toast
          this.dialogRef.close(updatedUser); // Close dialog with updated user data
        }, error => {
          this.toastr.error('Error updating user: ' + error.message);  // Error Toast
        });
      } else {
        this.userForm.markAllAsTouched(); // Trigger form validation
      }
    } else if (this.data.action === 'delete') {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(this.data.user!.email).subscribe(() => {
          this.toastr.success('User deleted successfully!');  // Success Toast
          this.dialogRef.close(this.data.user); // Close dialog with deleted user data
        }, error => {
          this.toastr.error('Error deleting user: ' + error.message);  // Error Toast
        });
      }
    }
  }
}

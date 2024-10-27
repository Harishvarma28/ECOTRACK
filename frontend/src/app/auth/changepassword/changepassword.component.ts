import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  email = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  changePassword() {
    // Check if any fields are empty
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      alert('All fields are required.');
      return;
    }

    // Check if the new password matches the confirm password
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    // Call the change password API
    this.authService.changePassword(this.email, this.newPassword, this.confirmPassword).subscribe(
      response => {
        alert('Password changed successfully!');
        this.router.navigate(['/login']); // Redirect to login
      },
      error => {
        alert('Error changing password: ' + (error.error?.message || error.message)); // Adjusted error message handling
      }
    );
  }
}

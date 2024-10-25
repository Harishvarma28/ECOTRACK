import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: (response) => {
        // Handle success response
        console.log('Signup successful', response);
        this.router.navigate(['/login']); // Redirect to login after successful signup
      },
      error: (err) => {
        // Handle error response
        console.error('Signup failed', err);
        this.errorMessage = err.error.message || 'Signup failed. Please try again.';
      }
    });
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust path as necessary
import { Router } from '@angular/router';  // Import Router

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                // Check user role and status
                console.log(response.user.status)
                if (response.user.status === 'New User') {
                    // Redirect to change password page for new users
                    this.router.navigate(['/auth/changepassword']);
                } else if (response.user.role === 'Admin' || response.user.role=== 'User') {
                    // Redirect to the dashboard for admin or existing users
                    this.router.navigate(['/dashboard']);
                } else {
                    // Handle other statuses or messages if needed
                }
            },
            (error) => {
                // Handle errors based on the response from the backend
                if (error.error === 'Inactive user') {
                    alert('Your account is inactive. Please contact support.');
                } else {
                    alert(error.error);
                }
            }
        );
    }
}

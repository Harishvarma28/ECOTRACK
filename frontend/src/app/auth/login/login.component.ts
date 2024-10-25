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

    constructor(private authService: AuthService,private router: Router) {}

    onSubmit() {
        this.authService.login(this.email, this.password).subscribe(
            response => {
                console.log('Login successful', response);
                this.router.navigate(['/dashboard'])
                // Handle successful login (e.g., redirect)
            },
            error => {
                console.error('Login failed', error);
                // Handle error (show message to user)
            }
        );
    }
}

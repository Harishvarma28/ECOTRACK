import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust path as necessary
import { Router } from '@angular/router';  // Import Router
import { ToastService } from '../../Features/services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
    @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
    @ViewChild('playButton') playButton!: ElementRef<HTMLButtonElement>;
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router,private toastService: ToastService) {}
    ngAfterViewInit(): void {
        this.tryPlayVideo();
        this.addUserInteractionListener();
    }

    onSubmit() {
        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                // Check user role and status
                            // Check if the user is inactive
            if (response.user.status === 'Inactive') {
              // Display error message and prevent login
              this.toastService.error('Your account is inactive. Please contact support.');
              return; // Exit the function to stop further execution
          }

                
                console.log(response.user.status)
                if (response.user.status === 'New User') {
                    // Redirect to change password page for new users
                    this.router.navigate(['/auth/changepassword']);
                    this.toastService.info('Please change your password to proceed.');
                } else if (response.user.role === 'Admin' || response.user.role=== 'User') {
                    // Redirect to the dashboard for admin or existing users
                    this.toastService.success('Login successful! Welcome to your dashboard.');
                    this.router.navigate(['/dashboard']);
                    // this.toastService.success('Login successful! Welcome to your dashboard.');
                } else {
                    // Handle other statuses or messages if needed
                    this.toastService.warning('Unrecognized user status.');
                }
            },
            (error) => {
                // Handle errors based on the response from the backend
                if (error.error === 'Inactive user') {
                    this.toastService.error('Your account is inactive. Please contact support.');
                } else {
                    this.toastService.error("UNAUTHORIZED");
                }
            }
        );
    }

    
  // Listen for any user interaction on the page (hover, click, etc.)
  addUserInteractionListener(): void {
    const video = this.videoElement.nativeElement;

    if (video) {
      // Add event listeners for various user interactions
      const interactionEvents = ['mousemove', 'click', 'touchstart', 'mouseover'];

      interactionEvents.forEach(event => {
        document.addEventListener(event, () => this.playVideo(), { once: true });
      });
    }
  }

  tryPlayVideo(): void {
    const video = this.videoElement.nativeElement;
  
    if (video) {
      // Try to play the video
      video.play().then(() => {
        console.log('Video is playing');
      }).catch((error: any) => {
        console.error('Autoplay failed, attempting to play video:', error);
  
        // If autoplay fails, show the "Start" button
        this.playButton.nativeElement.style.display = 'block';
      });
    }
  }
  
  // Function to play the video after user interaction
  playVideo(): void {
    const video = this.videoElement.nativeElement;
  
    if (video) {
      video.play().then(() => {
        console.log('Video played after user interaction');
        // Hide the play button once the video starts
        this.playButton.nativeElement.style.display = 'none';
      }).catch((error: any) => {
        console.error('Failed to play video after user interaction:', error);
      });
    }
  }
}

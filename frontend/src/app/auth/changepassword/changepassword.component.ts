import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../Features/services/toast.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('playButton') playButton!: ElementRef<HTMLButtonElement>;

  email = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService,private toastr: ToastService) {}
  ngAfterViewInit(): void {
    this.tryPlayVideo();
        this.addUserInteractionListener();
  }

  changePassword() {
    // Check if any fields are empty
    if (!this.email || !this.newPassword || !this.confirmPassword) {
      this.toastr.error('All fields are required.');
      return;
    }

    // Check if the new password matches the confirm password
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('New passwords do not match.');
      return;
    }

    // Call the change password API
    this.authService.changePassword(this.email, this.newPassword, this.confirmPassword).subscribe(
      response => {
        // this.toastr.success('Password changed successfully!');
        this.router.navigate(['/login']); // Redirect to login
      },
      error => {
        console.log(error)
        //  this.toastr.error(error.message) // Adjusted error message handling
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

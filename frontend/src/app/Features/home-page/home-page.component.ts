import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('playButton') playButton!: ElementRef<HTMLButtonElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.tryPlayVideo();
    gsap.from('.logo', { opacity: 0, y: -50, duration: 1 });
    gsap.from('.slogan', { opacity: 0, x: 100, duration: 1, delay: 0.5 });
    gsap.from('.mission', { opacity: 0, x: -100, duration: 1, delay: 1 });
    gsap.from('.cta-button', { scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.2, delay: 1.5 });
    this.addUserInteractionListener();
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
 


 // Function to attempt playing the video and handle errors if autoplay fails

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

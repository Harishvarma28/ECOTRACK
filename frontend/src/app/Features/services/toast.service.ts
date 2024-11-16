import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  // Display success message
  success(message: string, title: string = '', duration: number = 3000): void {
    console.log('succ_test_toaster');
    this.toastr.success(message, title, {
      timeOut: duration,
      closeButton: true,
      progressBar: true, // Optional: Shows a progress bar
    });
  }

  // Display error message
  error(message: string, title: string = '', duration: number = 3000): void {
    this.toastr.error(message, title, {
      timeOut: duration,
      closeButton: true,
      progressBar: true, // Optional: Shows a progress bar
    });
  }

  // Display info message
  info(message: string, title: string = '', duration: number = 3000): void {
    console.log('test_logout');
    this.toastr.info(message, title, {
      timeOut: duration,
      closeButton: true,
      progressBar: true, // Optional: Shows a progress bar
    });
  }

  // Display warning message
  warning(message: string, title: string = '', duration: number = 3000): void {
    this.toastr.warning(message, title, {
      timeOut: duration,
      closeButton: true,
      progressBar: true, // Optional: Shows a progress bar
    });
  }
}

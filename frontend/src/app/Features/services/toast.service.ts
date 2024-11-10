import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  // Display success message
  success(message: string, duration: number = 3000): void {
    this.showToast(message, 'success-toast', duration);
  }

  // Display error message
  error(message: string, duration: number = 3000): void {
    this.showToast(message, 'error-toast', duration);
  }

  // Display info message
  info(message: string, duration: number = 3000): void {
    this.showToast(message, 'info-toast', duration);
  }

  // Display warning message
  warning(message: string, duration: number = 3000): void {
    this.showToast(message, 'warning-toast', duration);
  }

  // Generic method to display toast
  private showToast(message: string, panelClass: string, duration: number): void {
    const config: MatSnackBarConfig = {
      duration,
      panelClass,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    };
    this.snackBar.open(message, 'Close', config);
  }
}

import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public dialog: MatDialog) {}


  images = [
    'assets/CuroselImages/curoselImg1.jpg',
    'assets/CuroselImages/curoselImg2.jpg',
    'assets/CuroselImages/curoselImg3.jpg'
  ];

  openRecyclingCollectionForm() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Recycling Collection Form',
        formType: 'recyclingCollection'
      }
    });
  }

  openRecyclingRevenueForm() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Recycling Revenue Details',
        formType: 'recyclingRevenue'
      }
    });
  }

  openLandfillExpenseForm() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Landfill Expense Details',
        formType: 'landfillExpense'
      }
    });
  }


}

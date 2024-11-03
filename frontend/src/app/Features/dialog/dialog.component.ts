import { Component, Inject,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataFormService } from '../services/data-form.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  recyclingForm!: FormGroup;
  revenueForm!: FormGroup;
  expenseForm!: FormGroup;

  materialTypes = [
    { value: 'aluminum', label: 'Aluminum', weight: 'lbs' },
    { value: 'cardboard', label: 'Cardboard', weight: 'lbs' },
    { value: 'glass', label: 'Glass', weight: 'lbs' },
    { value: 'metalCans', label: 'Metal Cans', weight: 'lbs' },
    { value: 'metalScrap', label: 'Metal Scrap', weight: 'lbs' },
    { value: 'paperBooks', label: 'Paper Books', weight: 'lbs' },
    { value: 'paperMixed', label: 'Paper Mixed', weight: 'lbs' },
    { value: 'paperNewspaper', label: 'Paper Newspaper', weight: 'lbs' },
    { value: 'paperWhite', label: 'Paper White', weight: 'lbs' },
    { value: 'plastic1PET', label: 'Plastic #1 PET', weight: 'lbs' },
    { value: 'plastic2HDPEColored', label: 'Plastic #2 HDPE Colored', weight: 'lbs' },
    { value: 'plastic2HDPENatural', label: 'Plastic #2 HDPE Natural', weight: 'lbs' }
  ];
  

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataFormService: DataFormService,
    private authService:AuthService
  ) {
    const userId = this.authService.getuserid();
    // Initialize forms directly in the constructor
    this.recyclingForm = this.fb.group({
      userId: [userId],
      collectionDate: [null],
      foodWasteWeight: [null],
      aluminumWeight: [null],
      cardboardWeight: [null],
      glassWeight: [null],
      metalWeight: [null],
      metalSubcategory: [null],
      paperWeight: [null],
      paperSubcategory: [null],
      plasticWeight: [null],
      plasticSubcategory: [null]
    });

    this.revenueForm = this.fb.group({
      userId: [userId],
      saleDate: [null],          // Sale date selection
      materialType: [null],     // Material type selection
      revenueAmount: [null],     // Revenue input
      buyer: [null]             // Buyer input
  });

    this.expenseForm = this.fb.group({
      userId: [userId],
      expenseAmount: [null],
      // expenseType: [null],
      landfillDate: [null],
      weight: [null],
      landfillHauler: [null]
    });
  }

  save() {
    let formData: any;

    if (this.data.formType === 'recyclingCollection') {
      formData = this.recyclingForm.value;
      this.dataFormService.submitRecyclingCollection(formData).subscribe({
        next: (response) => {
          console.log('Recycling collection submitted successfully:', response);
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          console.error('Error submitting recycling collection:', error);
          // Handle the error accordingly (e.g., show a message to the user)
        }
      });
    } else if (this.data.formType === 'recyclingRevenue') {
      formData = this.revenueForm.value;
      this.dataFormService.submitRecyclingRevenue(formData).subscribe({
        next: (response) => {
          console.log('Recycling revenue form submitted successfully:', response);
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          console.error('Error submitting recycling revenue form:', error);
          // Handle the error accordingly (e.g., show a message to the user)
        }
      });
    } else if (this.data.formType === 'landfillExpense') {
      formData = this.expenseForm.value;
      this.dataFormService.submitLandfillExpense(formData).subscribe({
        next: (response) => {
          console.log('LandFill Expenses form submitted successfully:', response);
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          console.error('Error submitting LandFill Expenses:', error);
          // Handle the error accordingly (e.g., show a message to the user)
        }
      });
    }

    console.log(formData);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

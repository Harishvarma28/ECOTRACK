import { Component, Inject,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataFormService } from '../services/data-form.service';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastService } from '../services/toast.service';


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
    private authService:AuthService,
    private snackBar: MatSnackBar,
    private toasterService: ToastService
  ) {
    const userId = this.authService.getuserid();
    // Initialize forms directly in the constructor
    this.recyclingForm = this.fb.group({
      userId: [userId],
      collectionDate: [null, Validators.required],
      foodWasteWeight: [0, [Validators.required, Validators.min(0)]],
      aluminumWeight:[0, [Validators.required, Validators.min(0)]],
      cardboardWeight: [0, [Validators.required, Validators.min(0)]],
      glassWeight: [0, [Validators.required, Validators.min(0)]],
      metalWeight: [0, [Validators.required, Validators.min(0)]],
      metalSubcategory: [null],
      paperWeight: [0, [Validators.required, Validators.min(0)]],
      paperSubcategory: [null],
      plasticWeight: [0, [Validators.required, Validators.min(0)]],
      plasticSubcategory: [null]
    });

    this.revenueForm = this.fb.group({
      userId: [userId],
      saleDate: [null],          // Sale date selection
      materialType: [null],     // Material type selection
      revenueAmount: [null],     // Revenue input
      buyer: [null],             // Buyer input
      weight: [0, [Validators.required, Validators.min(0)]]
  });

    this.expenseForm = this.fb.group({
      userId: [userId],
      expenseAmount: [null],
      // expenseType: [null],
      landfillDate: [null],
      weight: [0, [Validators.required, Validators.min(0)]],
      landfillHauler: [null]
    });
  }

  save() {
    let formData: any;
    const formData1 = this.recyclingForm.value;

    // Check if subcategory fields require weight input
    const missingFields = [];
    console.log("form1data",formData1)
    if (formData1.metalSubcategory && !formData1.metalWeight) {
      missingFields.push('Metal Weight');
  }
  if (formData1.paperSubcategory && !formData1.paperWeight) {
      missingFields.push('Paper Weight');
  }
  if (formData1.plasticSubcategory && !formData1.plasticWeight) {
      missingFields.push('Plastic Weight');
  }

  // New validation: check if weight is provided without a subcategory
  if (formData1.metalWeight && !formData1.metalSubcategory) {
      missingFields.push('Metal Subcategory');
  }
  if (formData1.paperWeight && !formData1.paperSubcategory) {
      missingFields.push('Paper Subcategory');
  }
  if (formData1.plasticWeight && !formData1.plasticSubcategory) {
      missingFields.push('Plastic Subcategory');
  }
  if (missingFields.length > 0) {
    this.toasterService.error(`Please complete the following fields: ${missingFields.join(', ')}`);
    return;
  }

    if (this.data.formType === 'recyclingCollection') {
      formData = this.recyclingForm.value;
      this.dataFormService.submitRecyclingCollection(formData).subscribe({
        next: (response) => {
          this.toasterService.success('Recycling collection submitted successfully!');
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          this.toasterService.error(error);
          console.error('Error submitting recycling collection:', error);
        }
      });
    } else if (this.data.formType === 'recyclingRevenue') {
      formData = this.revenueForm.value;
      this.dataFormService.submitRecyclingRevenue(formData).subscribe({
        next: (response) => {
          this.toasterService.success('Recycling revenue form submitted successfully!');
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          this.toasterService.error(error);
          console.error('Error submitting recycling revenue form:', error);
          // Handle the error accordingly (e.g., show a message to the user)
        }
      });
    } else if (this.data.formType === 'landfillExpense') {
      formData = this.expenseForm.value;
      this.dataFormService.submitLandfillExpense(formData).subscribe({
        next: (response) => {
          this.toasterService.success('LandFill Expenses form submitted successfully!');
          this.dialogRef.close(formData); // Optionally close the dialog
        },
        error: (error) => {
          this.toasterService.error(error);
          console.error('Error submitting LandFill Expenses:', error.error);
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

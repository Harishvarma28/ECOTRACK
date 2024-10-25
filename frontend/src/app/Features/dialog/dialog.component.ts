import { Component, Inject,NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}

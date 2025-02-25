import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { PeriodicElement } from '../../../core/models/data.model';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss'],
  standalone: true, // Mark as standalone
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule, // Add datepicker module
    MatSelectModule, // Add select module
    MatNativeDateModule, // Add native date module for datepicker
  ],
})
export class ElementDialogComponent {
  elementForm: FormGroup;
  statusOptions = ['Active', 'Inactive', 'Pending']; // Options for the status dropdown

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private fb: FormBuilder
  ) {
    // Initialize the form with the new fields
    this.elementForm = this.fb.group({
      position: [data.position || null, Validators.required],
      name: [data.name || '', Validators.required],
      weight: [data.weight || null, Validators.required],
      symbol: [data.symbol || '', Validators.required],
      date: [data.date || null, Validators.required], // New date field
      time: [data.time || '', Validators.required], // New time field
      status: [data.status || '', Validators.required], // New status field
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.elementForm.valid) {
      this.dialogRef.close(this.elementForm.value); // Return the form value
    }
  }
}

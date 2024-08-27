import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../contact-list/contact-list.component';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
export interface Editcontact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {

  contactForm: FormGroup;
  fetchApi = inject(FetchApiService)

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact) {
    this.contactForm = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Populate the form with data passed from the dialog
    this.contactForm.patchValue(this.data);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.fetchApi.updateContact(this.contactForm.value).subscribe((res: any) => {
        if (res) {
          alert('contact updated sucessfully!');
        }
        this.dialogRef.close(); // Close the dialog
      });
    }
  }
}

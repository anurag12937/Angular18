import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact-list/contact-list.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatPaginatorModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  dataSource: Contact[] = [];
  fetchApi = inject(FetchApiService)
  formData: any;

  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private dialogRef: MatDialogRef<AddContactComponent>) {

  }
  onSave() {
    if (this.contactForm.valid) {
      this.formData = this.contactForm.value;
      this.fetchApi.addContact(this.formData).subscribe((res: any) => {
        if (res) {
          alert('Contact saved successfully!');
          this.dialogRef.close();
          this.getAllContacts();// Reload the contacts list if needed
        }
        else {
          alert('Contact not saved!');
        }
      });
    }
  }
  getAllContacts() {
    this.fetchApi.getAllContact().subscribe((res: any) => {
      this.dataSource = res.contacts;
    });
  }
}

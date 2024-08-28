import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContactComponent } from '../edit-contact/edit-contact.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// modal define
export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule, // For common directives 
    ReactiveFormsModule, // For reactive forms
    MatTableModule, // For Angular Material Table
    MatInputModule, // For Angular Material Input
    MatFormFieldModule // For Angular Material Form Field
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {

  // Show column in mat table
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];

  dataSource = new MatTableDataSource<Contact>([]);

  previousData = new MatTableDataSource<Contact>([]);

  searchControl = new FormControl('');

  fetchApi = inject(FetchApiService) // fetch service

  constructor(public dialog: MatDialog) {
    this.getAllContacts();

    this.searchControl.valueChanges.subscribe(value => {

      const filterValue = value?.trim().toLowerCase() ?? '';

      // Filter data based on search value
      const filteredData = this.previousData.data.filter(x =>
        filterValue.length === 0 || x.firstName.toLowerCase().includes(filterValue)
        || x.lastName.toLowerCase().includes(filterValue)
        || x.email.toLowerCase().includes(filterValue)
      );
      // Update the dataSource with filtered data
      this.dataSource.data = filteredData;
    });
  }

  ngOnInit(): void {
    this.getAllContacts();
  }
  // Fetch all contact details 
  getAllContacts() {
    this.fetchApi.getAllContact().subscribe((res: any) => {
      this.dataSource.data = res.contacts;
      this.previousData.data = res.contacts;
    });
  }
  // update selected contact details
  editItem(Contact: any): void {
    const dialogRef = this.dialog.open(EditContactComponent, {
      width: '600px',
      data: Contact // Pass the contact data to the dialog
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllContacts(); // Reload the contacts list after closing the dialog
    });
  }

  // delete record from DB file
  deleteItem(Contact: any) {
    this.fetchApi.getDeleted(Contact.id).subscribe((res: any) => {
      if (res) {
        alert('Contact removed sucessfully!');
        this.getAllContacts();
      }
      else {
        alert('record not deleted');
      }
    });
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatDialog } from '@angular/material/dialog';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

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
  imports: [MatTableModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit {

  // Show column in mat table
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: Contact[] = [];

  fetchApi = inject(FetchApiService) // fetch service

  constructor(public dialog: MatDialog) {
    this.getAllContacts();
  }

  ngOnInit(): void {
    this.getAllContacts();
  }
  // Fetch all contact details 
  getAllContacts() {
    this.fetchApi.getAllContact().subscribe((res: any) => {
      this.dataSource = res.contacts;
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

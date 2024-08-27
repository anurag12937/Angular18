import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FetchApiService } from '../../services/fetch-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {

  constructor(public dialog: MatDialog) { this.getAllContacts();}
  ngOnInit(): void {
    this.getAllContacts();
  }
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource: Contact[] = [];
  fetchApi = inject(FetchApiService)
  getAllContacts() {
    this.fetchApi.getAllContact().subscribe((res: any) => {
      this.dataSource = res.contacts;
    });
  }
  editItem(Contact: any): void {
    const dialogRef = this.dialog.open(EditContactComponent, {
      width: '600px',
      data: Contact // Pass the contact data to the dialog
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllContacts(); // Reload the contacts list after closing the dialog
    });
  }
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

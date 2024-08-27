import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactListComponent } from './Forms/contact-list/contact-list.component';
import { AddContactComponent } from './Forms/add-contact/add-contact.component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContactListComponent, AddContactComponent, MatToolbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'ContactApp';
  constructor(public dialog: MatDialog) { }
  openFormModal() {
    this.dialog.open(AddContactComponent, {
      width: '600px',
    });
  }
}

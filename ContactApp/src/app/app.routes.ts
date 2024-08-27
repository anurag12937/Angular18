import { Routes } from '@angular/router';
import { AddContactComponent } from './Forms/add-contact/add-contact.component';
import { ContactListComponent } from './Forms/contact-list/contact-list.component';

export const routes: Routes = [
    { path: '', component: ContactListComponent },
    { path: 'create-contact', component: AddContactComponent }
];

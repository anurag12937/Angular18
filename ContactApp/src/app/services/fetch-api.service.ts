import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  baseUrl: string = "http://localhost:5200/Contact/";

  constructor(private http: HttpClient) { }

  // add new contact
  addContact(contact: any) {
    return this.http.post(`${this.baseUrl}CreateAsync`, contact);
  }

  // update existing contact
  updateContact(contact: any) {
    return this.http.put(`${this.baseUrl}UpdateAsync`, contact);
  }

  // Get all Contact from DB
  getAllContact() {
    return this.http.get(`${this.baseUrl}GetContacts`);
  }

  // delete selected contact from the list
  getDeleted(id: number) {
    return this.http.delete(`${this.baseUrl}DeleteAsync/${id}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchApiService {
  baseUrl: string = "http://localhost:5200/Contact/";

  constructor(private http: HttpClient) { }
  addContact(contact: any) {
    return this.http.post(`${this.baseUrl}CreateAsync`, contact);
  }
  updateContact(contact: any) {
    return this.http.put(`${this.baseUrl}UpdateAsync`, contact);
  }
  getAllContact() {
    return this.http.get(`${this.baseUrl}GetContacts`);
  }
  getDeleted(id: number) {
    debugger;
    return this.http.delete(`${this.baseUrl}DeleteAsync/${id}`);
  }
}
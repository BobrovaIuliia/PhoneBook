import { Injectable } from '@angular/core';
import { Contact } from '../classes/contact'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contacts: Contact[];
  private nextId: number;

  constructor() {
    let contacts = this.getContacts();

    if (contacts.length == 0)
      this.nextId = 1;
    else {
      let maxId = contacts[contacts.length - 1].id;
      this.nextId = maxId + 1;;
    }
  }

  public addContact(fio: string, email: string, birthday: Date, phones: any,photo:string): void {
    let contact = new Contact(this.nextId, fio, email, birthday, phones,photo);
    //console.log(contact);
    let contacts = this.getContacts();
    contacts.push(contact);
    //console.log(contacts);
    this.setLocalStorageContacts(contacts);

    this.nextId++;
  }

  public editContact(id: number, fio: string, email: string, birthday: Date, phones: any,photo:string): void {
    let contacts = this.getContacts();
    let contactIndex = contacts.findIndex((contact => contact.id == id));
    contacts[contactIndex].fio = fio;
    contacts[contactIndex].email = email;
    contacts[contactIndex].birthday = birthday;
    contacts[contactIndex].phone = phones;
    contacts[contactIndex].photo = photo;
//console.log(contacts[contactIndex].photo);
    this.setLocalStorageContacts(contacts);
  }

  private setLocalStorageContacts(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify({ contacts: contacts }))
  }

  public getContacts(): Contact[] {
    let localStorageItem = JSON.parse(localStorage.getItem('contacts'));
    return localStorageItem == null ? [] : localStorageItem.contacts;
  }

  public removeContact(id: number): void {
    let contacts = this.getContacts();
    contacts = contacts.filter(contact => contact.id != id);
    this.setLocalStorageContacts(contacts);
  }

  public getContact(id: number): any {
    let contact = this.getContacts().find(contact => contact.id == id);
    return contact;
  }

  public search(term: string) {
    return this.getContacts().filter(contact => contact.fio.indexOf(term) > -1);
  }
}

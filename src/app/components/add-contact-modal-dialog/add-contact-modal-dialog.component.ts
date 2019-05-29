import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { ContactsService } from '../../services/contacts.service'
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { Contact } from 'src/app/classes/contact';

@Component({
  selector: 'app-add-contact-modal-dialog',
  templateUrl: './add-contact-modal-dialog.component.html',
  styleUrls: ['./add-contact-modal-dialog.component.css']
})
export class AddContactModalDialogComponent implements OnInit {

  public inputFio: string;
  public inputEmail: string;
  public inputPhone: string;
  public inputBirhday: Date;
  public countOfPhone: number;
  public numbers = [];
  public myForm: FormGroup;
  public phones = [];

  @Input() contactEditParams: Contact;
  @Input() isAddContact: boolean;
  @Output() closeModalDialoge = new EventEmitter<any>();

  constructor(private contactsService: ContactsService, private fb: FormBuilder) {
    this.inputFio = '';
    this.inputEmail = '';
  }

  ngOnInit() {
    this.countOfPhone = 1;
    this.numbers = Array(this.countOfPhone).fill(0).map((x, i) => i + 1);

    this.myForm = this.fb.group({
      phones: this.fb.array([])
    })
    if (!this.isAddContact) {
      this.inputFio = this.contactEditParams.fio;
      this.inputEmail = this.contactEditParams.email;
      this.inputBirhday = new Date(this.contactEditParams.birthday);
      for (let i = 0; i < this.contactEditParams.phone.length; i++) {
        this.phoneForms.push(this.fb.group(this.contactEditParams.phone[i]));
      }
    }
  }

  private addContact(): void {
    this.contactsService.addContact(this.inputFio, this.inputEmail, new Date(this.inputBirhday.getFullYear(), this.inputBirhday.getMonth(), this.inputBirhday.getDate(), 0, 0, 0, 0), this.phoneForms.value)
    this.inputFio = '';
    this.inputEmail = '';
    this.closeDialogeWindow();
  }

  private editContact(): void {
    this.contactsService.editContact(this.contactEditParams.id, this.inputFio, this.inputEmail, new Date(this.inputBirhday.getFullYear(), this.inputBirhday.getMonth(), this.inputBirhday.getDate(), 0, 0, 0, 0), this.phoneForms.value);
    this.closeDialogeWindow();
  }

  private closeDialogeWindow(): void {
    this.closeModalDialoge.emit(event);
  }


  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  private addPhone() {
    const phone = this.fb.group({
      number: [],
    })

    this.phoneForms.push(phone);
  }

  private deletePhone(i) {
    this.phoneForms.removeAt(i);
  }

}

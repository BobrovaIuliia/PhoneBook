import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public isModalDialogVisible: boolean = false;
  public isAddContact: boolean = true;
  public contactInfo: any;
  public contactEditParams: any;
  public birthdayName = [];

  constructor(private contactsService: ContactsService) {
  }

  ngOnInit() {
    let currentDate = new Date();
    let birthdayText = 'Сегoдня празднуют свои дни рождения:  ';
    this.birthdayName = this.contactsService.getContacts()
      .filter(contact => (new Date(contact.birthday).getMonth() == currentDate.getMonth() && new Date(contact.birthday).getDate() == currentDate.getDate()));
    this.birthdayName.forEach(contact => { birthdayText += contact.fio + '\n'; });
    alert(birthdayText);
  }
  private selectContact(event) {
    this.contactInfo = this.contactsService.getContact(event)
  }

  private editContact(event) {
    this.contactEditParams = this.contactsService.getContact(event)
    this.isModalDialogVisible = true;
    this.isAddContact = false;
  }
  private openModalDialoge(event) {
    this.isModalDialogVisible = true;
    this.isAddContact = true;
  }
  private closeModalDialoge() {
    this.isModalDialogVisible = false;

  }

}

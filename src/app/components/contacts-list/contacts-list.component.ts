import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/classes/contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnChanges {

  //private isModalDialogVisible:boolean=true;
  private contacts = [];
  private searchString: string;
  term$ = new Subject<string>();

  @Output() selectContact = new EventEmitter<number>();
  @Output() editContact = new EventEmitter<number>();
  @Input() isModalDialogVisible: boolean;


  constructor(private contactsService: ContactsService) {
    this.contacts = contactsService.getContacts();
    this.term$.subscribe(term => this.search(term));
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.contacts = this.contactsService.getContacts();
    this.searchString = "";
  }

  private onSelect(event) {
    this.selectContact.emit(event);
  }

  private onRemove(event) {
    this.contacts = this.contactsService.getContacts();
    this.searchString = "";
  }

  private onEdit(event) {
    this.editContact.emit(event);
  }

  private search(term: string) {
    this.contacts = this.contactsService.search(term);
  }

}

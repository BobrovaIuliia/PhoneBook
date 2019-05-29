import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {

  @Input() item: string;
  @Output() onSelect = new EventEmitter<number>();
  @Output() onRemove = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
  }

  private selectContact(target): void {
    console.log(target.parentNode);
    this.onSelect.emit(target.parentNode.id);
  }

  private removeContact(target): void {
    this.contactsService.removeContact(target.parentNode.parentNode.parentNode.id);
    this.onRemove.emit(target);
  }

  private editContact(target): void {

    this.onEdit.emit(target.parentNode.parentNode.parentNode.id);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-contact-button',
  templateUrl: './add-contact-button.component.html',
  styleUrls: ['./add-contact-button.component.css']
})
export class AddContactButtonComponent implements OnInit {
  @Output() openModalDialoge = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  private onClick(event): void {
    this.openModalDialoge.emit(event);
  }
}

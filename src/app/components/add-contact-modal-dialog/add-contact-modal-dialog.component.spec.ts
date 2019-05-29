import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactModalDialogComponent } from './add-contact-modal-dialog.component';

describe('AddContactModalDialogComponent', () => {
  let component: AddContactModalDialogComponent;
  let fixture: ComponentFixture<AddContactModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

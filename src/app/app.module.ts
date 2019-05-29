import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AddContactButtonComponent } from './components/add-contact-button/add-contact-button.component';
import { AddContactModalDialogComponent } from './components/add-contact-modal-dialog/add-contact-modal-dialog.component';
import { ContactsService } from './services/contacts.service'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { from } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { ReactiveFormsModule }   from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    ContactsListComponent,
    ContactInfoComponent,
    AddContactButtonComponent,
    AddContactModalDialogComponent,
    ContactItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    AccordionModule,
    MenuModule,
    CalendarModule
  ],
  providers: [
    ContactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

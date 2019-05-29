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
  public photoBase64: string;
  public myForm: FormGroup;
  public phones = [];
  public isUploadFile: boolean = false;

  @ViewChild('photoPreview') photoPreview: ElementRef;

  @Input() contactEditParams: Contact;
  @Input() isAddContact: boolean;

  @Output() closeModalDialoge = new EventEmitter<any>();

  constructor(private contactsService: ContactsService, private fb: FormBuilder) {
    this.inputFio = '';
    this.inputEmail = '';
  }

  ngOnInit() {

    this.myForm = this.fb.group({
      phones: this.fb.array([])
    });

    if (!this.isAddContact) {
      this.inputFio = this.contactEditParams.fio;
      this.inputEmail = this.contactEditParams.email;
      this.inputBirhday = new Date(this.contactEditParams.birthday);
      for (let i = 0; i < this.contactEditParams.phone.length; i++) {
        this.phoneForms.push(this.fb.group(this.contactEditParams.phone[i]));
      }

      this.photoPreview.nativeElement.querySelector('img', '.photo-preview').setAttribute('src', this.contactEditParams.photo);

    }
  }

  //Функция добавления нового контакта  
  private addContact(): void {
    let birthday = null;
    this.photoBase64 = this.photoPreview.nativeElement.querySelector('img', '.photo-preview').getAttribute('src');
    if (this.inputBirhday) {
      birthday = new Date(this.inputBirhday.getFullYear(), 
                          this.inputBirhday.getMonth(), 
                          this.inputBirhday.getDate(), 0, 0, 0, 0);
    }
    this.contactsService.addContact(this.inputFio, 
                                    this.inputEmail, 
                                    birthday, 
                                    this.phoneForms.value, 
                                    this.photoBase64);
    this.closeDialogeWindow();
  }

  private editContact(): void {
    this.photoBase64 = this.photoPreview.nativeElement.querySelector('img', '.photo-preview').getAttribute('src');
    this.contactsService.editContact(this.contactEditParams.id, 
                                     this.inputFio, 
                                     this.inputEmail, 
                                     new Date(this.inputBirhday.getFullYear(), 
                                              this.inputBirhday.getMonth(), 
                                              this.inputBirhday.getDate(), 0, 0, 0, 0), 
                                     this.phoneForms.value, 
                                     this.photoBase64);
    this.closeDialogeWindow();
  }

  //Функция закрытия диалогового окна по нажатию кнопки "Отмена"
  private closeDialogeWindow(): void {
    this.isUploadFile = false;
    this.closeModalDialoge.emit(event);
  }

  //Функця для получения всех номеров телефона
  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  //Функция для добавления нового телефона
  private addPhone() {
    const phone = this.fb.group({
      number: [],
    })

    this.phoneForms.push(phone);
  }

  //Функция удаления строчки телефона
  private deletePhone(i) {
    this.phoneForms.removeAt(i);
  }

  //Функция для загрузки фото
  private importFile(event) {
    let files = event.target.files;

    if (files) {
      this.sendFiles(files);
      this.isUploadFile = true;
    }
  }

  //Функция проверки пришедшего файла
  private sendFiles(files) {
    let photo = files[0];
    let maxFileSize = 5242880;
    let Data = new FormData();

    if ((photo.size <= maxFileSize) && ((photo.type.match('image.*')))) {
      Data.append('photos', photo);
    }

    this.handleFiles(Data.getAll('photos')[0]);
  };

  //Функция для отображения превью фото в диалоговом окне
  private handleFiles(file) {
    let reader = new FileReader();

    reader.onload = (e)=>{
      this.photoPreview.nativeElement.querySelector('img', '.photo-preview').setAttribute('src', reader.result);
    }
    reader.readAsDataURL(file);
  }

}

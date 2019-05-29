export class Contact {
    id: number;
    fio: string;
    phone: [];
    email: string;
    birthday: Date;
    photo: string;

    constructor(id: number,
        fio: string,
        email: string,
        birthday: Date,
        phone: [],
        photo: string) {
        this.id = id;
        this.fio = fio;
        this.email = email;
        this.birthday = birthday;
        this.phone = phone;
        this.photo=photo;
    }
}

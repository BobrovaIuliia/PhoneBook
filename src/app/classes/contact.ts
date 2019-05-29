export class Contact {
    id: number;
    fio: string;
    phone: [];
    email: string;
    birthday: Date;

    constructor(id: number,
        fio: string,
        email: string,
        birthday: Date,
        phone: []) {
        this.id = id;
        this.fio = fio;
        this.email = email;
        this.birthday = birthday;
        this.phone = phone;

    }
}

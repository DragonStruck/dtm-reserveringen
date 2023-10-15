export class Account {

    //TODO: can we store password here?
    constructor(id, admin, email, password) {
        this.id = id;
        this.admin = admin;
        this.email = email;
        this.password = password;
    }

    setValues(json) {
        this.id = json.id;
        this.admin = json.admin;
        this.email = json.email;
        this.password = json.password;
    }
}
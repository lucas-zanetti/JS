class User {

    constructor(name, gender, birth, country, email, password, photo, admin){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
        this._id;
    }

    get name(){
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get gender(){
        return this._gender;
    }

    set gender(value){
        this._gender = value;
    }

    get birth(){
        return this._birth;
    }

    set birth(value){
        this._birth = value;
    }

    get country(){
        return this._country;
    }

    set country(value){
        this._country = value;
    }

    get email(){
        return this._email;
    }

    set email(value){
        this._email = value;
    }

    get password(){
        return this._password;
    }

    set password(value){
        this._password = value;
    }

    get photo(){
        return this._photo;
    }

    set photo(value){
        this._photo = value;
    }

    get admin(){
        return this._admin;
    }

    set admin(value){
        this._admin = value;
    }

    get register(){
        return this._register;
    }

    set register(value){
        this._register = value;
    }

    get id(){
        return this._id;
    }

    set id(value){
        this._id = value;
    }

    loadFromJSON(json){
        for (let name in json){
            if (name == '_register'){
                this[name] = new Date(json[name]);
            } else {
                this[name] = json[name];
            }
        }
    }

    static getUsersStorage(){
        let users = [];

        if(localStorage.getItem('users')) users = JSON.parse(localStorage.users);

        return users;
    }

    getNewId(){
        if (!window.id) window.id = 0;

        id++

        return id;
    }

    save(){
        let users = User.getUsersStorage();

        if (this.id > 0){
            users.map(u=>{
                if (u._id == this.id) Object.assign(u, this);

                return u;
            });
        } else {
            this.id = this.getNewId();

            users.push(this);
        }

        localStorage.setItem("users", JSON.stringify(users));
    }
}
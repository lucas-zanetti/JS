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
                if(name.substring(0, 1) === '_') this[name] = json[name];
            }
        }
    }

    static getUsersStorage(){
        let users = [];

        if(localStorage.getItem('users')) users = JSON.parse(localStorage.users);

        return users;
    }

    getNewId(){
        let usersID = parseInt(localStorage.getItem('usersID'));

        if (!usersID > 0) usersID = 0;

        usersID++

        localStorage.setItem("usersID", usersID);

        return usersID;
    }

    toJSON(){
        let json = {};

        Object.keys(this).forEach(key =>{
            if(this[key] !== undefined) json[key] = this[key];
        });

        return json;
    }

    save(){
        return new Promise((resolve, reject) =>{
            let promise;

            if (this.id){
                promise = HttpRequest.put(`/users/${this.id}`, this.toJSON());
            } else {
                promise = HttpRequest.post(`/users`, this.toJSON());
            }

            promise.then(data =>{
                this.loadFromJSON(data);
                resolve(this);
            }).catch(e =>{
                reject(e);
            });
        });
    }

    removeUser(){
        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            if (this.id == userData._id) users.splice(index, 1);
        });

        localStorage.setItem("users", JSON.stringify(users));
    }
}
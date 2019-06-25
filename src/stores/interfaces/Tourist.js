import axios from 'axios'

export class Tourist {
    _name;
    _surname;
    _sex;
    _birthday;
    _notes;

    constructor({name, surname, sex, birthday, notes}) {
        this._name = name;
        this._surname = surname;
        this._sex = sex;
        this._birthday = birthday;
        this._notes = notes;
    }

    post(){
        axios.post('http://localhost:8080/tourists', {name:this._name, surname:this._surname}, {
            headers: {
             'Content-Type': 'application/json'
            }})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
}
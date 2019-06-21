import {observable, action} from 'mobx'

class Tourist {
    _name;
    _surname;
    _sex;
    _birthday;
    _notes;


    set name(value) {
        this._name = value;
    }

    set surname(value) {
        this._surname = value;
    }

    set sex(value) {
        this._sex = value;
    }

    set birthday(value) {
        this._birthday = value;
    }

    set notes(value) {
        this._notes = value;
    }


}

//export const tourist = new Tourist();
import { observable, action } from "mobx";

class Tourist{
    @observable data = {};

    @action setTouristData(label, value){
        this.data[label] = value
    }
}


export const tourist = new Tourist();

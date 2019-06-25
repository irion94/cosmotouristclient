import { observable, action } from "mobx";

class TouristList{
    @observable data = [];

    @action pushTouristList(item){
        this.data.push(item)
    }

    @action setTouristList(array){
        this.data = array;
    }
}


export const touristStore = new TouristList();

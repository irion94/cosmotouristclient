import { observable, action } from "mobx";

class TouristList{
    @observable data = [];

    @action pushTouristList(item){
        this.data.unshift(item)
    }

    @action setTouristList(array){
        this.data = array;
    }
}


export const touristStore = new TouristList();

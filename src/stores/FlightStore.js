import {action, observable} from "mobx";

class FlightStore {
    @observable data = [];

    @action pushFlightList(item) {
        this.data.unshift(item)
    }

    @action setFlightList(array) {
        this.data = array;
    }

    @action getFlightById(id) {
        return this.data.find((item) => item.id === id)
    }

}


export const flightStore = new FlightStore();

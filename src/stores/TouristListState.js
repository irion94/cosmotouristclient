import {observable, action} from 'mobx'

class TouristListState{
    @observable _visible = false;
    @observable _flight = null;
    @observable _tourist = null;
    @observable _flightList = [];


    @action get_visible() {
        return this._visible;
    }

    @action set_visible(value) {
        this._visible = value;
    }

    @action get_flight() {
        return this._flight;
    }

    @action set_flight(value) {
        this._flight = value;
    }

    @action get_tourist() {
        return this._tourist;
    }

    @action set_tourist(value) {
        this._tourist = value;
    }

    @action get_flightList() {
        return this._flightList;
    }

    @action set_flightList(value) {
        this._flightList = value;
    }
}

export const touristState = new TouristListState()
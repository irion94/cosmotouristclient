//CRUD
import axios from "axios";
import {http} from "./apiUtils";
import {flightStore} from "../stores/FlightStore";

//CREATE
export const createFlight = (data) => {
    return axios.post(`${http}/flights`, data, {
        headers: {
            'Content-Type': 'application/json'
        }})
};

//READ
export const fetchFlight = async  (id = false) => {
    let request;
    if (!id)
        request = `${http}/flights`;
    else
        request = `${http}/flights/${id}`;

    return await axios.get(request)

};

//UPDATE
export const updateFlight = async (id, data) => {
     return await axios.put(`${http}/flights/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }})
};

//DELETE
export const deleteFlight = (id) => {
    axios.delete(`${http}/flights/${id}`)
        .then(() => {
            fetchFlight()
                .then((res) => {
                        flightStore.data = res.data
                    }
                )
        })
        .catch((err) => console.log(err))
};


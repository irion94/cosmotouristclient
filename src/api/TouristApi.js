//CRUD
import axios from "axios";
import {http} from "./apiUtils";
import {touristStore} from "../stores/TouristStore";

//CREATE
export const createTourist = (data) => {
    return axios.post(`${http}/tourists`, data, {
        headers: {
            'Content-Type': 'application/json'
        }})
};

//READ
export const fetchTourists = async (id = false) => {
    let request;
    if (!id)
        request = `${http}/tourists`;
    else
        request = `${http}/tourists/${id}`;

    return await axios.get(request)

};

//UPDATE
export const updateTourist = async (id, data) => {
    console.log('DATA', data)
    return await axios.put(`${http}/tourists/${id}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }})
};

//DELETE
export const deleteTourist = (id) => {
    axios.delete(`${http}/tourists/${id}`)
        .then(() => {
            fetchTourists()
                .then((res) => {
                    touristStore.data = res.data
                }
            )
        })
        .catch((err) => console.log(err))
};


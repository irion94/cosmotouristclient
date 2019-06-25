import React from 'react'
import {Button} from 'react-bootstrap'
import {observer} from "mobx-react";

import ClientForm from "../components/ClientForm";
import TouristList from "../components/TouristList";
import Popup from "../components/Popup";
import {fetchTourists} from "../api/TouristApi";
import {touristStore} from "../stores/TouristStore";
import {fetchFlight} from "../api/FlightApi";
import {flightStore} from "../stores/FlightStore";

@observer
class TouristScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formVisible: false,
        };
        this.showModal = this.showModal.bind(this)
    }

    showModal(){
        this.setState((prevState) => ({
            formVisible: !prevState.formVisible
        }))
    }

    async componentDidMount() {
        await fetchTourists()
            .then((res) => {
                touristStore.setTouristList(res.data)
            });
        await fetchFlight()
            .then((res) => {
                flightStore.setFlightList(res.data)
            })
    }


    render() {
        return (
            <div className="p-2 d-md-block">
                <div className="d-flex flex-column">
                    <Button
                        onClick={() => this.showModal()}
                    >
                        New Tourist
                    </Button>
                </div>

                {
                    this.state.formVisible ?
                        <Popup close={this.showModal}>
                            <ClientForm buttonTitle={"Add Tourist"}/>
                        </Popup> :
                        null
                }
                <TouristList data={touristStore.data}/>
            </div>
        )
    }
}

export default TouristScreen

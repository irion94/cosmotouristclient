import React from 'react'
import {Button} from 'react-bootstrap'
import {observer} from "mobx-react";

import Popup from "../components/Popup";
import FlightList from "../components/FlightList";
import FlightForm from "../components/FlightForm";
import {fetchFlight} from "../api/FlightApi";
import {flightStore} from "../stores/FlightStore";

@observer
class FlightScreen extends React.Component {
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

     componentDidMount() {
         fetchFlight()
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
                        New Flight
                    </Button>
                </div>

                {
                    this.state.formVisible ?
                        <Popup close={this.showModal}>
                            <FlightForm buttonTitle="Add Flight"/>
                        </Popup> :
                        null
                }
                <FlightList data={flightStore.data}/>
            </div>
        )
    }
};

export default FlightScreen

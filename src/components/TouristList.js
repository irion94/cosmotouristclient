import React from 'react'
import {Button, ButtonGroup, Table} from 'react-bootstrap'
import {deleteTourist, fetchTourists, updateTourist} from "../api/TouristApi";
import Popup from "./Popup";
import FlightList from "./FlightList";
import {observer, PropTypes} from "mobx-react"
import {touristStore} from "../stores/TouristStore";
import {flightStore} from "../stores/FlightStore";
import {fetchFlight, updateFlight} from "../api/FlightApi";
import {touristState} from "../stores/TouristListState";

@observer
class TouristList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            flight: null,
            tourist: null,
            flightList: []
        };
        this.getFlightId = this.getFlightId.bind(this);
    }

    getFlightId(id) {
        this.setState({flight: id}, () => console.log('Fetched Id', this.state))
    }

    async addFlight() {
        const {flight, tourist} = this.state;
        if (flight.numberOfSeats > 0 && !this.state.flightList.find((item) => flight.id === item.id)) {


            updateFlight(flight.id, {
                ...flight,
                numberOfSeats: flight.numberOfSeats - 1,
                numberOfPassengers: flight.numberOfPassengers + 1
            })
                .then(() => fetchFlight()
                    .then((res) => flightStore.setFlightList(res.data))
                    .then(() => {
                        updateTourist(tourist.id, {
                            ...this.state.tourist,
                            flightList: [...tourist.flightList, flight]
                        })
                            .then(() => {
                                fetchTourists()
                                    .then((res) => {
                                        touristStore.setTouristList(res.data)
                                    });
                            })
                            .catch((err) => {
                                    console.log(err)
                                }
                            )
                            .finally(() => {
                                this.setState({
                                    flightList: [...this.state.flightList, flightStore.getFlightById(flight.id)],
                                    flight: null,
                                    tourist: null
                                })
                            })
                    })
                );
        }
    }

    render() {
        return (
            <div style={{overflow: 'auto', maxHeight: this.props.maxHeight}} className="p-2">
                {
                    touristState._visible ?
                        <Popup close={() => touristState.set_visible(false)}>
                            <FlightList maxHeight={500} data={this.state.flightList} buttons={false}/>
                            <FlightList maxHeight={500} data={flightStore.data} getFlightId={this.getFlightId}
                                        buttons={false} minSeats={1}/>
                            {
                                this.state.flight ?
                                    <Button onClick={() => this.addFlight()}>Add Flight</Button> : null
                            }
                        </Popup>
                        : null
                }
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.surname}</td>
                                <td>{item.sex}</td>
                                <td>{new Date(item.birthday).toLocaleDateString()}</td>
                                <td style={{maxWidth: 200}}>{item.notes}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button variant="success"
                                                // onClick={() => this.setState({
                                                //     visible: true,
                                                //     flightList: item.flightList,
                                                //     tourist: item
                                                // })}
                                            onClick={() => touristState.set_visible(true)}
                                        >
                                            List of flights
                                        </Button>
                                        <Button variant="danger" onClick={() => {
                                            deleteTourist(item.id);
                                        }}>
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

TouristList.propTypes = {
    data: PropTypes.observableArray
};

TouristList.defaultProps = {
    data: []
};

export default TouristList
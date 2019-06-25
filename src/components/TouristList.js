import React from 'react'
import {Button, ButtonGroup, Table} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {observer} from "mobx-react"

import {deleteTourist, fetchTourists, updateTourist} from "../api/TouristApi";
import Popup from "./Popup";
import FlightList from "./FlightList";
import {touristStore} from "../stores/TouristStore";
import {flightStore} from "../stores/FlightStore";
import {fetchFlight, updateFlight} from "../api/FlightApi";

@observer
class TouristList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            flight: null,
            tourist: null,
            flightList: [],
            selected:{
                green: false,
                red: false
            }
        };
        this.getFlightId = this.getFlightId.bind(this);
    }

    getFlightId(id) {
        this.setState({flight: id}, () => console.log('Fetched Id', this.state));
    }

    async addFlight() {
        const {tourist} = this.state;
        const flight = this.state.flight.green;
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
                                    visible: false, flight: null
                                });
                            })
                    })
                );
        }
    }

    removeFlight() {
        const {tourist} = this.state;
        const flight = this.state.flight.red;
            updateFlight(flight.id, {
                ...flight,
                numberOfSeats: flight.numberOfSeats + 1,
                numberOfPassengers: flight.numberOfPassengers - 1
            })
                .then(() => fetchFlight()
                    .then((res) => flightStore.setFlightList(res.data))
                    .then(() => {
                        updateTourist(tourist.id, {
                            ...this.state.tourist,
                            // flightList: [...tourist.flightList, flight]
                            flightList: tourist.flightList.filter(item => item.id !== flight.id )
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
                                    flightList: tourist.flightList.filter(item => item.id !== flight.id ),
                                    visible: false, flight: null
                                })
                            })
                    })
                );

    }

    deleteTourist(item){
        item.flightList.map(async  flight => {
            await updateFlight(flight.id, {
                ...flight,
                numberOfSeats: flight.numberOfSeats + 1,
                numberOfPassengers: flight.numberOfPassengers - 1
            })
        });
        deleteTourist(item.id)
            .then(() => {
                fetchFlight()
                    .then((res) => flightStore.setFlightList(res.data))
            })
    }


    render() {
        const {buttons} = this.props;
        return (
            <div style={{overflow: 'auto', maxHeight: this.props.maxHeight}} className="p-2">
                {
                    this.state.visible ?
                        <Popup close={() => this.setState({visible: false, flight: null})}>
                            <TouristList data={[this.state.tourist]} buttons={false}/>
                            <p>Actual Flight List</p>
                            <FlightList
                                maxHeight={500}
                                data={this.state.flightList}
                                buttons={false}
                                getFlightId={this.getFlightId}
                                markColor="red"
                                selected={this.state.selected.red}
                            />
                            <p>All Flighsts</p>
                            <FlightList
                                maxHeight={500}
                                data={flightStore.data}
                                getFlightId={this.getFlightId}
                                buttons={false}
                                minSeats={1}
                                markColor="green"
                                selected={this.state.selected.green}
                            />
                            {
                                this.state.flight ?
                                this.state.flight.green ? <Button onClick={() => this.addFlight()}>Add Flight</Button> : null : null
                            }
                            {
                                this.state.flight ?
                                this.state.flight.red ? <Button onClick={() => this.removeFlight()}>Remove Flight</Button> : null : null
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
                        {
                            buttons ? <th></th>
                                : null
                        }
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
                                {
                                    buttons ?
                                        <td>
                                            <ButtonGroup>
                                                <Button variant="success"
                                                        onClick={() => this.setState({
                                                            visible: true,
                                                            flightList: item.flightList,
                                                            tourist: item
                                                        })}
                                                >
                                                    List of flights
                                                </Button>
                                                <Button variant="danger" onClick={() => {
                                                    this.deleteTourist(item);
                                                }}>
                                                    Delete
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                        : null
                                }
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
    data: PropTypes.array,
    buttons: PropTypes.bool
};

TouristList.defaultProps = {
    data: [],
    buttons: true
};

export default TouristList
import React from 'react'
import {Button, ButtonGroup, Table} from 'react-bootstrap'
import Popup from "./Popup";
import {deleteFlight} from "../api/FlightApi";
import TouristList from "./TouristList";
import PropTypes from "prop-types";
import {observer} from 'mobx-react'

@observer
class FlightList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    onClick(item) {
        if(!this.props.buttons) this.setState({selected: item.id}, () => this.props.getFlightId(item))
    }

    render() {
        const {maxHeight, buttons, minSeats} = this.props;
        return (
            <div style={{overflow: 'auto', maxHeight: maxHeight}} className="p-2">
                {
                    this.state.visible ?
                        <Popup close={() => this.setState({visible: false})}>
                            <TouristList maxHeight={500}/>
                        </Popup>
                        : null
                }
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date of arrival</th>
                        <th>Departure date</th>
                        <th>Number of seats</th>
                        <th>Tourist count</th>
                        <th>Flight cost</th>
                        {
                            buttons ? <th></th> : null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map(item => {
                                if (buttons || item.numberOfSeats >= minSeats) {
                                    return <tr onClick={() => this.onClick(item)}
                                               style={this.state.selected === item.id ? {backgroundColor: 'red'} : null}>
                                        <td>{item.id}</td>
                                        <td>{item.departureDate}</td>
                                        <td>{item.arriveDate}</td>
                                        <td>{item.numberOfSeats}</td>
                                        <td>{item.numberOfPassengers}</td>
                                        <td>{item.ticketCost}</td>
                                        {
                                            buttons ?
                                                <td>
                                                    <ButtonGroup>
                                                        <Button variant="success"
                                                                onClick={() => this.setState({visible: true})}>
                                                            List of tourists
                                                        </Button>
                                                        <Button variant="danger" onClick={() => {
                                                            deleteFlight(item.id);
                                                        }}>
                                                            Delete
                                                        </Button>
                                                    </ButtonGroup>
                                                </td>: null
                                        }
                                    </tr>
                                }
                            }
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

FlightList.propTypes = {
    data: PropTypes.array,
    buttons: PropTypes.bool,
    minSeats: PropTypes.number
};

FlightList.defaultProps = ({
    minSeats: 0,
    data: [],
    buttons: true,
    getFlightId: () => {
    }
});

export default FlightList
import React from 'react';
import {Button, Col, Form} from 'react-bootstrap'
import {observer} from 'mobx-react'

import MyCalendar from "./MyCalendar";
import {flightStore} from "../stores/FlightStore";
import {createFlight} from "../api/FlightApi";

@observer
class FlightForm extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            inputDisabled: false,
            validated: false,
            flight:{
                numberOfPassengers: 0
            }
        };
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit(event) {
        console.log("STATE",this.state)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            this.setState({ validated: true });

            createFlight(this.state.flight)
                .then((res) => {
                    flightStore.pushFlightList(res.data);
                    if(this.props.next) {
                        this.props.next();
                        this.setState({inputDisabled: true})
                    }
                })
        }
    }


    onChange(e){
        this.setState({flight:{
                ...this.state.flight,
                [e.target.name]: e.target.value
            }
        });
    }


    render() {
        const { validated, inputDisabled } = this.state;
        const {buttonTitle} = this.props;
        return (
            <Form
                noValidate
                validated={validated}
                // onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Arrive Date</Form.Label>
                            <MyCalendar name="arriveDate" getDate={this.onChange} disabled={inputDisabled}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Departure Date</Form.Label>
                            <MyCalendar name="departureDate" getDate={this.onChange} disabled={inputDisabled}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Number of seats</Form.Label>
                        <Form.Control
                            value={this.state.flight.name}
                            name="numberOfSeats"
                            required
                            type="number"
                            placeholder="Number of seats"
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Ticket cost</Form.Label>
                        <Form.Control
                            value={this.state.flight.name}
                            name="ticketCost"
                            required
                            type="number"
                            step="0.01"
                            placeholder="Ticket cost"
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                {
                    !inputDisabled ?
                        <Button onClick={(e) => this.handleSubmit(e)} className="float-left">{buttonTitle}</Button>
                        : null
                }
            </Form>
        );
    }
}

export default FlightForm
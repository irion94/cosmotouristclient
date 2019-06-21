import React from 'react';
import {Form, Button, Col, InputGroup, Row} from 'react-bootstrap'

import MyCalendar from "./MyCalendar";
import {tourist} from '/Users/irion94/cosmic_flights/src/stores/Tourist'


class NewClientForm extends React.Component {

    constructor(...args) {
        super(...args);

        this.state = {
            validated: false,
            calendar: false,
            person:{}
        };
        this.closeCalendar = this.closeCalendar.bind(this)
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        console.log(form.value)
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    closeCalendar(){
        this.setState({calendar: !this.state.calendar})
    }

    onChange(e){
        console.log(tourist.name)
        this.setState({person:{
                ...this.state.person,
                [e.target.name]: e.target.value
            }});
        console.log(e.target)
    }

    render() {
        console.log(this.state)
        const { validated } = this.state;
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            onChange={(e) => tourist.name(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            name="surname"
                            required
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label as="legend" column sm={2}>
                            Sex
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                required
                                type="radio"
                                label="male"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                required
                                type="radio"
                                label="female"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                required
                                type="radio"
                                label="undefined"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Birthday</Form.Label>
                        <MyCalendar/>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Country" required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Country.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" placeholder="Notes" />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Submit form</Button>
            </Form>
        );
    }
}

export default NewClientForm
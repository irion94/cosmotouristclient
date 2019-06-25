import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap'
import {observer} from 'mobx-react'

import MyCalendar from "./MyCalendar";
import {createTourist} from "../api/TouristApi";
import {touristStore} from "../stores/TouristStore";

@observer
class ClientForm extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            inputDisabled: false,
            validated: false,
            person:{}
        };
        this.onChange = this.onChange.bind(this)
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            this.setState({ validated: true });
            createTourist(this.state.person)
                .then((res) => {
                    touristStore.pushTouristList(res.data);
                    if(this.props.next) {
                        this.props.next();
                        this.setState({inputDisabled: true})
                    }
                })
        }
    }


    onChange(e){
        this.setState({person:{
                ...this.state.person,
                [e.target.name]: e.target.value
            }
        });
    }


    render() {
        const { validated, inputDisabled } = this.state;
        const {buttonTitle} = this.props;
        console.log(this.state.person)
        return (
            <Form
                noValidate
                validated={validated}
                // onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            value={this.state.person.name}
                            name="name"
                            required
                            type="text"
                            placeholder="First name"
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
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
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label as="legend">
                            Gender
                        </Form.Label>
                        <Col as={Row} className="justify-content-center">
                            <Form.Check
                                className="m-2"
                                disabled={inputDisabled}
                                onChange={(e) => this.onChange(e)}
                                required
                                value="Male"
                                type="radio"
                                label="Male"
                                name="sex"
                                id="formHorizontalRadios1"
                            />
                            <Form.Check
                                className="m-2"
                                disabled={inputDisabled}
                                onChange={(e) => this.onChange(e)}
                                required
                                value="Female"
                                type="radio"
                                label="Female"
                                name="sex"
                                id="formHorizontalRadios2"
                            />
                            <Form.Check
                                className="m-2"
                                disabled={inputDisabled}
                                onChange={(e) => this.onChange(e)}
                                required
                                value="Other"
                                type="radio"
                                label="Other"
                                name="sex"
                                id="formHorizontalRadios3"
                            />
                        </Col>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Birthday</Form.Label>
                        <Col>
                            <MyCalendar name={"birthday"} getDate={this.onChange} disabled={inputDisabled}/>
                        </Col>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            name="country"
                            type="text"
                            placeholder="Country"
                            required
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Country.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            name="notes"
                            type="text"
                            placeholder="Notes"
                            onChange={(e) => this.onChange(e)}
                            disabled={inputDisabled}
                        />
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

export default ClientForm
import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class MyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [this.props.name]: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            [this.props.name]: date
        }, () => this.props.getDate({target: {name: this.props.name, value: this.state.date}}))
    }

    componentDidMount() {
        this.props.getDate({target: {name: this.props.name, value: this.state.date}})
    }

    render() {
        console.log(this.props)
        return (
            <DatePicker
                disabled={this.props.disabled}
                selected={this.state[this.props.name]}
                onChange={this.handleChange}
            />
        );
    }
}

export default MyCalendar
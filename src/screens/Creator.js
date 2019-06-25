import React from 'react'
import ClientForm from "../components/ClientForm";
import FlightList from "../components/FlightList";

class Creator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightListVisible: false
        }
        this.next = this.next.bind(this)
    }

    next(){
        this.setState({flightListVisible: true})
    }

    render() {
        return (
            <div className="p-2 d-md-block">
                <ClientForm buttonTitle={"Add Flight"} next={this.next}/>
                {
                    this.state.flightListVisible ? <FlightList/> : null
                }
            </div>
        )
    }
};

export default Creator

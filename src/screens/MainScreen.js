import React from 'react'
import {MainNavbar} from "../components/MainNavbar";
import NewClientForm from "../components/NewClientForm";

const MainScreen = () => {
    return(
        <div className="container">
            <MainNavbar/>
            <NewClientForm/>
        </div>
    )
};

export default MainScreen

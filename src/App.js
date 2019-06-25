import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

import {MainNavbar} from "./components/MainNavbar";
import TouristScreen from "./screens/TouristScreen";
import FlightScreen from "./screens/FlightScreen";

function App() {
  return (
      <Router>
          <div className="container">
              <MainNavbar />
              <Route exact path="/tourists" component={TouristScreen} />
              <Route exact path="/flights" component={FlightScreen} />
              <Route path="/about"/>
              <Route path="/topics" />
          </div>
      </Router>
  );
}

export default App;

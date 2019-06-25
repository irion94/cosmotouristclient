import React from 'react'
import {Nav, Navbar} from "react-bootstrap"

export const MainNavbar = () =>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Cosmo Travel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/tourists">Tourist</Nav.Link>
                <Nav.Link href="/flights">Flights</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>;
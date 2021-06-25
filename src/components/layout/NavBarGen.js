import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const NavBarGen = ({ authState }) => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUserPhrases")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">phrase.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">My Languages</Nav.Link>
                    {authState.isAuthenticated ? <Nav.Link onClick={logout} href="/login">Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarGen

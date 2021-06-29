import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const NavBarGen = ({ authState, setAuth }) => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUserPhrases")
        setAuth({user: {}, isAuthenticated:false})
        window.location.href = "/login"
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">phrase.io</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard">My Languages</Nav.Link>
                    {authState.isAuthenticated ? <Nav.Link onClick={logout}>Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarGen

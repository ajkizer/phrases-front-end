import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import LoginForm from "../components/forms/LoginForm"
import SignUpForm from '../components/forms/SignUpForm';
import { AuthContext } from '../context/AuthContext';



const Login = () => {
    const [hasAccount, toggleHasAccount] = useState(true);
    const {user, setUser} = useContext(AuthContext)

    const checkIfLoggedIn = () => {
 
    }
    useEffect(() => {
        checkIfLoggedIn()
    }, [])
  

    return (
        <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            {hasAccount ? <LoginForm toggleHasAccount={toggleHasAccount}/> : <SignUpForm toggleHasAccount={toggleHasAccount}/>}
        </Col>
    )
}



export default Login

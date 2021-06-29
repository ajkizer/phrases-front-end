import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap'
import { Redirect } from 'react-router';
import LoginForm from "../components/forms/LoginForm"
import SignUpForm from '../components/forms/SignUpForm';
import { AuthContext } from '../context/AuthContext';



const Login = () => {
    const [hasAccount, toggleHasAccount] = useState(true);
    const {user, setUser} = useContext(AuthContext)


  

    return (
        <Col xs={{ span: 12 }} md={{ span: 6, offset: 3 }}>
            {user.isAuthenticated && <Redirect to="/dashboard"/>}
            {hasAccount ? <LoginForm toggleHasAccount={toggleHasAccount}/> : <SignUpForm toggleHasAccount={toggleHasAccount}/>}
        </Col>
    )
}



export default Login

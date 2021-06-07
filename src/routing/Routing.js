import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from '../pages/Login';


const Routing = () => {
    return (
        <Switch>
            <Route exact path="/"></Route>
            <Route exact path="/login"></Route>
            <Route exact path="/dashboard"></Route>
            <Route path="*"></Route>
        </Switch>
    )
}
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';


const Routing = () => {
    return (
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/dashboard"><Dashboard/>
            </Route>
        </Switch>
    )
}


export default Routing
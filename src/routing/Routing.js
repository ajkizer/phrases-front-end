import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Experience from '../pages/Experience';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PhrasePage from '../pages/PhrasePage'


const Routing = ({authState}) => {
    return (
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/login"><Login authState={authState}/></Route>
            <Route exact path="/dashboard"><Dashboard authState={authState}/>
            </Route>
            <Route exact path="/dashboard/experiences/:id"><Experience/></Route>
            <Route exact path="/dashboard/experiences/:id/phrases/:phrase_id"><PhrasePage/></Route>
        </Switch>
    )
}


export default Routing
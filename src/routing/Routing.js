import React, {useState, useMemo} from 'react';
import {Route, Switch} from 'react-router-dom';
import { AuthContext, initialState } from '../context/AuthContext';
import {ExperienceContext} from '../context/ExperienceContext';
import Dashboard from '../pages/Dashboard';
import Experience from '../pages/Experience';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PhrasePage from '../pages/PhrasePage'



const Routing = () => {


    const [user, setUser] = useState(initialState)
    const [experiences, setExperiences] = useState([])


    const authProviderValue = useMemo(() => ({user, setUser}), [user, setUser])
    const experienceProviderValue = useMemo(() => ({experiences, setExperiences}), [experiences, setExperiences])


    return (
        <Switch>
            <AuthContext.Provider value={authProviderValue}>
                <Route exact path="/"><Login/></Route>
                <Route exact path="/login"><Login/></Route>

                <ExperienceContext.Provider value={experienceProviderValue}>
                    <Route exact path="/dashboard"><Dashboard />
                    </Route>
                    <Route exact path="/dashboard/experiences/:id"><Experience/></Route>
                    <Route exact path="/dashboard/experiences/:id/phrases/:phrase_id"><PhrasePage/></Route>
                </ExperienceContext.Provider>
            </AuthContext.Provider>
        </Switch>
    )
}


export default Routing
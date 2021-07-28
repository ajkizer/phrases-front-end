import React, {useState, useMemo} from 'react';
import {Route, Switch} from 'react-router-dom';
import { AuthContext, initialState } from '../context/AuthContext';
import {ExperienceContext} from '../context/ExperienceContext';
import {PhraseContext} from '../context/PhraseContext'
import Dashboard from '../pages/Dashboard';
import Experience from '../pages/Experience';
import Login from '../pages/Login';
import PhrasePage from '../pages/PhrasePage'



const Routing = () => {


    const [user, setUser] = useState(initialState)
    const [experiences, setExperiences] = useState([])
    const [phrases, setPhrases] = useState([])


    const authProviderValue = useMemo(() => ({user, setUser}), [user, setUser])
    const experienceProviderValue = useMemo(() => ({experiences, setExperiences}), [experiences, setExperiences])
    const phraseProviderValue = useMemo(() => ({phrases, setPhrases}),[phrases, setPhrases])


    return (
        <Switch>
            <AuthContext.Provider value={authProviderValue}>
                <Route exact path="/"><Login/></Route>
                <Route exact path="/login"><Login/></Route>

                <ExperienceContext.Provider value={experienceProviderValue}>
                  
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    
                    <PhraseContext.Provider value={phraseProviderValue}>
                        <Route exact path="/dashboard/experiences/:id"><Experience/></Route>
                        <Route exact path="/dashboard/experiences/:id/phrases/:phrase_id"><PhrasePage/></Route>
                    </PhraseContext.Provider>
                </ExperienceContext.Provider>
            </AuthContext.Provider>
        </Switch>
    )
}


export default Routing
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { devMain, auth } from '../utils/apiURLs'
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Experiences from '../components/sections/Experiences'


const Dashboard = () => {
    const [loading, toggleLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);
    const {user, setUser} = useContext(AuthContext)

    const getExperiences = async () => {
       
        try {
            let res = await axios.get(`${devMain}/experiences`)

            if(res.data.data.length === 0){
                res = await axios.post(`${devMain}/admin/load`)
            }
            
            setExperiences(res.data.data);  
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getExperiences();
        toggleLoading(false);
    }, [])

    return (
        <div className="dashboard">

            {!user.isAuthenticated && <Redirect to="/login"/>}
            {loading ? "loading..." : <><Experiences experiences={experiences}/></>}

        </div>
    )
}

export default Dashboard

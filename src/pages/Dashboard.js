import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { devMain, auth } from '../utils/apiURLs'
import { Col, Card, Modal, Form, Button, Row, Badge } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


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

    console.log(user);

    useEffect(() => {


        getExperiences();
        toggleLoading(false);

    }, [])


    const Experiences = () => {
        

        return (
          
          
              
                <Row>
                    <Col md={{span: 6, offset: 3
                }}>
                        {experiences.length && experiences.map((experience, index) => 
                            <Card className="experiences__card"><Row>
                                    <Col>
                                        <Link to={`/dashboard/experiences/${experience._id}`}><span class={`flag-icon flag-icon-${experience.flagIcon}`}></span> {experience.targetLanguage}</Link>   
                                    </Col>
                                    <Col>
                                    
                                    <i class="fad fa-book">
                                    </i><span>1000</span>
                                    <i class="far fa-comment"></i>
                                    <span>25</span>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                    </Col>
                
                </Row>
)
    }

    return (
        <div className="dashboard">

            {!user.isAuthenticated && <Redirect to="/login"/>}
            {loading ? "loading..." : <><Experiences  /></>}

        </div>
    )
}

export default Dashboard

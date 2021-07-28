import React from 'react'
import {Row, Col, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Experiences = ({experiences}) => {
    return (
    <Row>
        <Col md={{span: 6, offset: 3}}>
            {experiences.length && experiences.map((experience, index) => 
                <Card key={experience._id} className="experiences__card">
                    <Link className="mx-auto" to={`/dashboard/experiences/${experience._id}`}><span class={`flag-icon flag-icon-${experience.flagIcon}`}></span> {experience.targetLanguage}</Link>
                </Card>
            )}
        </Col>
    </Row>
    )
}

export default Experiences

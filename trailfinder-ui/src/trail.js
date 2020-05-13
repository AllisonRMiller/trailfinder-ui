import React from 'react';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, Button, Container, Card, CardSubtitle, Badge } from 'reactstrap';


function Trail(props){
    let {id} = useParams();
    console.log("Arrived at Trail", props, {id})
    

    return(
        <h3 className="bg-white">{id}</h3>
    )


}
export default Trail;
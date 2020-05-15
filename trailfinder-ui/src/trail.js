import React, {useEffect} from 'react';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, Button, Container, Card, CardSubtitle, Badge } from 'reactstrap';


function Trail(props){
    let {id} = useParams();
    console.log("Arrived at Trail", props, id)
    
    //Once database is set up--run check to see if trail is in local storage>recent calls>then query API.
    // debugger;
    // const thisTrail = 

    // useEffect(() => {
    //     // console.log(props.results.data.trails);
    //     // console.log("Logging the find: ", )
    //     const thisTrail = props.result ? props.results.data.trails.find(trail => trail.id === id) : null;
    //     console.log(thisTrail);
    // }, [id, props])
    // debugger;
    // console.log(thisTrail);
    const thisTrail = props.results ? props.results.data.trails.find(trail => trail.id == id) : {};
    console.log(thisTrail);


    return(
        <h3 className="bg-white">{thisTrail ? thisTrail.name : null }</h3>
    )


}
export default Trail;
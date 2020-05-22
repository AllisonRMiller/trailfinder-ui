import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
    useHistory
} from 'react-router-dom';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faMapSigns, faHiking } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, CardImg, Container, Card, CardSubtitle, CardText, CardBody, Badge, CardFooter, Button } from 'reactstrap';
import './trail.css';


function Trail(props) {
    let { id } = useParams();
    // const [thisTrail, setThisTrail] = useState();
    console.log("Arrived at Trail", props.isLoggedIn)
    const history = useHistory();

    const googleMapRef = useRef();
    // const googleMapRef = createRef();

    // Creates a google map with given data
    //  Attempt to put this in another file and pass it the ref
    const createGoogleMap = (x) => {
        // debugger;
        console.log(x.latitude);
        return new window.google.maps.Map(googleMapRef.current, {
            zoom: 16,
            center: {
                lat: x.latitude,
                lng: x.longitude,
            },
            disableDefaultUI: true,
        })
    }


    // const phoneHomeTrail = async (id) => {
    //     console.log(id);
    //     const data = {
    //         id: id
    //     }

    //     await axios.post(`https://fleet-joy-276912.uk.r.appspot.com/api/singleTrail`, data)
    //         .then(async function (response) {
    //             console.log(response);
    //             // await set(response);
    //             thisTrail = response.data.trails.find(trail => trail.id == id)
    //             await localStorage.setItem("thisTrail", JSON.stringify(response.data.trails.find(trail => trail.id == id)));
            
    //             // setLatLong(latLng);
    //             // localStorage.setItem("latLng", JSON.stringify(latLng));
    //             // localStorage.setItem("address", JSON.stringify(address));
    //             // debugger;
    //             // pickRoute();
    //             //     if (response.data.success === 1 && response.data.trails.length !== 0) {
    //             //       history.push('/searchresults')
    //             //     }
    //             //     else {
    //             //       history.push('/error')
    //             //     }
    //         }
    //         )
    //         // .then(console.log(results))
    //         .catch(function (error) {
    //             console.log('Error: ', error);
    //             history.push('/error')
    //         })
    // }

    // Places a marker on the map
    const createMarker = (x, gmap) => {
        console.log(x);
        return new window.google.maps.Marker({
            position: { lat: x.latitude, lng: x.longitude },
            map: gmap,
        })

    }

    var thisTrail = {}
    const checkTrail = () => {
        var localResults = null;
        var notThisTrail = null;



        if (localStorage.getItem("results") !== null) { localResults = JSON.parse(localStorage.getItem("results")) }
        debugger;

        if (localStorage.getItem("thisTrail")!==null) {notThisTrail = JSON.parse(localStorage.getItem("thisTrail")) }


        if (localResults !== null) {
            thisTrail= localResults.data.trails.find(trail => trail.id == id)? localResults.data.trails.find(trail => trail.id == id) : notThisTrail ;
            debugger;
        } 
        else{
            thisTrail = notThisTrail;
            debugger;
        } 


//         if (notThisTrail == 'undefined') {
//             phoneHomeTrail(id);
// debugger;
//         } else {thisTrail = notThisTrail}


    }
    checkTrail();
    console.log(thisTrail);
    //new window.google.maps.LatLng(marker.position.lat(), marker.position.lng())

    // useEffect(() => {
    //     props.logged();
    //     console.log(props.isLoggedIn)

    // }, [props.isLoggedIn, props.logged, props])


    useEffect(() => {
        console.log("FIREST THE EFFECTS!:", thisTrail);
        if (props.googleMapsReady) {
            // debugger;
            const gmap = createGoogleMap(thisTrail);
            // const bounds = new window.google.maps.LatLngBounds();
            // debugger;
            const marker = createMarker(thisTrail, gmap);
            const loc = new window.google.maps.LatLng(
                thisTrail.latitude, thisTrail.longitude
            )
            // bounds.extend(loc);
            // gmap.fitBounds(bounds);
            // gmap.panToBounds(bounds);
        }
    }, [props.logged, props.googleMapsReady, thisTrail, props]);
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

    // var name = thisTrail.name
    var stars = thisTrail.stars
    // debugger;
    var eStar = <FontAwesomeIcon icon={farStar} />
    // debugger;
    var fStar = <FontAwesomeIcon icon={fasStar} />
    // debugger;
    var hikeSave = <FontAwesomeIcon icon={faHiking} />
    var conditionInd = <FontAwesomeIcon icon={faMapSigns} />
    // var condDate = Date.parse(thisTrail.conditionDate);
    // var condUpdate= new Date(new Date().getFullYear(condDate),new Date().getMonth(condDate),new Date().getDate(condDate))
    var difficulty = thisTrail.difficulty
    var badgecolor = thisTrail.difficulty
    var conditionColor = thisTrail.conditionStatus
    if (thisTrail.difficulty === "black") {
        difficulty = "Difficult";
        badgecolor = "dark"
    }
    else if (thisTrail.difficulty === "blue") {
        difficulty = "Intermediate";
        badgecolor = "success"
    }
    else {
        difficulty = "Easy";
        badgecolor = "primary"
    };

    if (thisTrail.conditionStatus == "All Clear") {
        conditionColor = "text-primary";
    }
    else if (thisTrail.conditionStatus == "Minor Issues") {
        conditionColor = "text-secondary"
    }
    else if (thisTrail.conditionStatus == "Unknown") {
        conditionColor = "text-dark"
    }
    else {
        conditionColor = "text-danger";
    };


    const saveTrail = async () => {
        var user = JSON.parse(localStorage.getItem("userInfo"));
        debugger;
        console.log(user.user.id);
        debugger;

        const data = {
            // headers: {Authorization: "Bearer " + props.token},
            user_id: user.user.id,
            api_id: id,
            stars: stars,
            difficulty: thisTrail.difficulty,
            name: thisTrail.name

        };
        console.log(data);

        await axios.post('https://fleet-joy-276912.uk.r.appspot.com/api/addTrail', data)
            .then(async function (response) {
                console.log(response);
            }
            )
            // .then(console.log(results))
            .catch(function (error) {
                console.log('Error: ', error);
                history.push('/error')
            })
    }

    var displayImage = thisTrail.imgMedium !== "" ?
        thisTrail.imgMedium : "./placeholderImage.png";



    return (
        <div id="singletrail" className="p-5">
            <Container mw-75="true" mh-75="true" center="true" className="bg-white">
                <Row>
                    <Col>
                        {props.token !== null &&
                            <Button
                                onClick={() => saveTrail()}
                                color="primary" className="float-right mt-4">{hikeSave} Save Trail</Button>
                        }
                        <h3 className="bg-white mt-3 mb-3">{thisTrail ? thisTrail.name : null}</h3>
                        <Badge color={badgecolor} className="mr-2 text-light">{difficulty}</Badge>
                        <Rating
                            initialRating={stars}
                            emptySymbol={eStar}
                            fullSymbol={fStar}
                            readonly
                            className="text-primary"
                        />
                        <Container className="mb-3 mt-2">

                            <Row>

                                <Col id="trailDisplay">

                                    <Card>
                                        <CardBody>
                                            <CardSubtitle className="mt-2">{thisTrail.summary}</CardSubtitle>
                                        </CardBody>


                                        <CardFooter>
                                            <Row>
                                                <Col>
                                                    <CardText>
                                                        Length:<br />
                                                        {/* </CardText> */}
                                                        {/* <CardText> */}
                                                        {thisTrail.length} miles
                                                    </CardText>
                                                </Col>
                                                <Col>
                                                    <CardText> Ascent:<br />
                                                        {/* </CardText> */}
                                                        {/* <CardText>  */}
                                                        {thisTrail.ascent}'

                                                   </CardText>
                                                    <CardText>
                                                        Descent:<br />
                                                        {/* </CardText>
                                                    <CardText>  */}
                                                        {thisTrail.descent}'</CardText>
                                                </Col>
                                                <Col>
                                                    <CardText> Highest point:<br />
                                                        {/* </CardText>
                                                   <CardText>  */}
                                                        {thisTrail.high}'
                                                   </CardText>
                                                    <CardText>
                                                        Lowest point:<br />
                                                        {/* </CardText>
                                                   <CardText>  */}
                                                        {thisTrail.low}'</CardText>

                                                </Col>
                                            </Row>
                                        </CardFooter>
                                        <CardBody>
                                            <CardTitle><h5>Trail conditions:</h5></CardTitle>
                                            <CardBody className="ml-3"><h5 className={conditionColor}>{conditionInd} {thisTrail.conditionStatus}</h5>
                                                <CardSubtitle>{thisTrail.conditionDetails}</CardSubtitle>
                                                {/* <CardSubtitle>last updated: {condUpdate}</CardSubtitle> */}
                                            </CardBody>
                                        </CardBody>
                                    </Card>
                                    <Card className="mt-2">
                                        <CardBody>
                                            <div
                                                id="google-map"
                                                ref={googleMapRef}
                                                style={{ width: '500px', height: '300px' }}
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <CardBody>
                                            <CardImg src={displayImage}></CardImg>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    {/* <Card className="mt-2">
                                        <CardBody>
                                            <div
                                                id="google-map"
                                                ref={googleMapRef}
                                                style={{ width: '400px', height: '300px' }}
                                            />
                                        </CardBody>
                                    </Card> */}
                                </Col>
                                <Col>

                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        </div>






    )


}
export default Trail;
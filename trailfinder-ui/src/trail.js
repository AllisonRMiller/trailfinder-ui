import React, { useEffect, useRef } from 'react';
import Rating from 'react-rating';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar, faMapSigns, faHiking } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, CardImg, Container, Card, CardSubtitle, CardText, CardBody, Badge, CardFooter, Button } from 'reactstrap';


function Trail(props) {
    let { id } = useParams();
    console.log("Arrived at Trail", props, id)


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

    // Places a marker on the map
    const createMarker = (x, gmap) => {
        console.log(x);
        return new window.google.maps.Marker({
            position: { lat: x.latitude, lng: x.longitude },
            map: gmap,
        })

    }

    const thisTrail = props.results ? props.results.data.trails.find(trail => trail.id == id) : {};
    console.log(thisTrail);
    //new window.google.maps.LatLng(marker.position.lat(), marker.position.lng())

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
    }, [props.googleMapsReady, thisTrail]);
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


    // const saveTrail = () => {
        
    // }




    return (
        <div id="singletrail" className="p-5">
            <Container mw-75="true" mh-75="true" center="true" className="bg-white">
                <Row>
                    <Col>
                        <h3 className="bg-white mt-3 mb-3">{thisTrail ? thisTrail.name : null}</h3>
                        <Button 
                        // onClick={saveTrail} 
                        className="float-right">{hikeSave} Save Trail</Button>
                        <Badge color={badgecolor} className="mr-2 text-light">{difficulty}</Badge>
                        <Rating
                            initialRating={stars}
                            emptySymbol={eStar}
                            fullSymbol={fStar}
                            readonly
                            className="text-primary"
                        />
                        <Container className="mb-3">

                            <Row>

                                <Col className="mt-4" id="trailDisplay">

                                    <Card>
                                        <CardBody>
                                            <CardSubtitle className="mt-2">{thisTrail.summary}</CardSubtitle>
                                        </CardBody>


                                        <CardFooter>
                                            <Row>
                                                <Col>
                                                    <CardText>
                                                        Length:<br/>
                                                        {/* </CardText> */}
                                                        {/* <CardText> */}
                                                        {thisTrail.length} miles
                                                    </CardText>
                                                </Col>
                                                <Col>
                                                    <CardText> Ascent:<br/>
                                                        {/* </CardText> */}
                                                        {/* <CardText>  */}
                                                        {thisTrail.ascent}'
                                                        
                                                   </CardText>
                                                    <CardText>
                                                        Descent:<br/>
                                                        {/* </CardText>
                                                    <CardText>  */}
                                                        {thisTrail.descent}'</CardText>
                                                </Col>
                                                <Col>
                                                    <CardText> Highest point:<br/>
                                                        {/* </CardText>
                                                   <CardText>  */}
                                                        {thisTrail.high}'
                                                   </CardText>
                                                    <CardText>
                                                        Lowest point:<br/>
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
                                </Col>
                                <Col m-9>
                                    <Card>
                                        <CardBody>
                                            <CardImg src={thisTrail.imgMedium ? 
                                                thisTrail.imgMedium : "./placeholderImage.png"}></CardImg>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col>

                                    <Card className="mt-2">
                                        <CardBody>
                                            <div
                                                id="google-map"
                                                ref={googleMapRef}
                                                style={{ width: '400px', height: '300px' }}
                                            />
                                        </CardBody>
                                    </Card>
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
import React, { useEffect, useRef } from 'react';
// import Rating from 'react-rating';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, Button, Container, Card, CardBody, CardSubtitle, Badge } from 'reactstrap';
import logo from './TrailfinderLogo2.png';
import "./searchResults.css";

function SearchResults(props) {

    // if response.success =1 then return page
    console.log("Arrived at search results", props);
    const googleMapRef = useRef();
    // const googleMapRef = createRef();

    //     useEffect((props) => {
    //             googleMap = createGoogleMap(props.latLong)
    //             props.results.data.trails.map(x => createMarker(x));
    //         });
    // });

    useEffect((props) => {
        if (props.googleMapsReady) {
            props.createGoogleMap(props.latLong);
            props.results.data.trails.map(x => props.createMarker(x));
        }
}, [props.googleMapsReady]);


// createGoogleMap(props.latLong);
// props.results.data.trails.map(x => createMarker(x));


//     }

//     return () => {
//         cleanup
//     }
// }, [input])


// const generateResults = (x) => {
//     var id = x.id
//     var name = x.name
//     var stars = x.stars
//     var eStar = <FontAwesomeIcon icon={farStar} />
//     var fStar = <FontAwesomeIcon icon={fasStar} />
//     var difficulty = x.difficulty
//     var badgecolor = x.difficulty
//     if (x.difficulty === "black") {
//         difficulty = "Difficult";
//         badgecolor = "dark"
//     }
//     else if (x.difficulty === "blue") {
//         difficulty = "Intermediate";
//         badgecolor = "success"
//     }
//     else {
//         difficulty = "Easy";
//         badgecolor = "primary"
//     }
//     return (
//         <Card key={id} id={id}>
//             <Link to={{ pathname: "/trail/" + id }} className="stretched-link"><CardTitle text="dark">{name}</CardTitle></Link>
//             <CardSubtitle>
//                 <Badge color={badgecolor} text="light">{difficulty}</Badge>
//                 <Rating
//                     initialRating={stars}
//                     emptySymbol={eStar}
//                     fullSymbol={fStar}
//                     readonly
//                     className="text-primary"
//                 />
//             </CardSubtitle>
//         </Card>
//     )
// }




return (
    <div id="resultsrender">
        <Container mt-5 mw-75 mh-75 center="true" className="bg-white">
            <Row mt-5>
                <Col>
                    <h2>Hikes near {props.address}</h2>
                    <Container>
                        <Row>

                            <Col m-3 id="resultsDisplay">

                                {props.results.data.trails.map(x => props.generateResults(x))}
                            </Col>
                            <Col m-9>
                                <Card>
                                    <CardTitle>Map Placeholder</CardTitle>
                                    <CardBody>
                                        <div
                                            id="google-map"
                                            ref={googleMapRef}
                                            style={{ width: '400px', height: '300px' }}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>

        </Container>
    </div>

)

    // else return response.message

};

export default SearchResults;


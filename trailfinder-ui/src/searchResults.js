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

     // Creates a google map with given data
    //  Attempt to put this in another file and pass it the ref
     const createGoogleMap = (x) =>{
        console.log(window.google);
        return new window.google.maps.Map(googleMapRef.current, {
              zoom: 16,
              center: {
                  lat: x.lat,
                  lng: x.lng,
              },
              disableDefaultUI: true,
          })}
  
      // Places a marker on the map
      const createMarker = (x,gmap) =>{
      console.log(x);
          return new window.google.maps.Marker({
              position: { lat: x.latitude, lng: x.longitude },
              map: gmap,
          })
          
        }


        // useEffect(() => {
        //     props.logged();
        //     console.log(props.isLoggedIn)
        
        // }, [props.isLoggedIn, props.logged, props])
//new window.google.maps.LatLng(marker.position.lat(), marker.position.lng())

var searchStuff= {};
var localSearchStuff = {};
if (localStorage.getItem("results")!==null){
    localSearchStuff = JSON.parse(localStorage.getItem("results"))
};

var latLng = {};
var localLatLng = {};
if (localStorage.getItem("latLng")!==null){
    localLatLng = JSON.parse(localStorage.getItem("latLng"))
}
var searchAddress = "";
var localAddress = "";
if (localStorage.getItem("address")!==null){
    localAddress = JSON.parse(localStorage.getItem("address"));
}
if (localSearchStuff !== null){
    searchStuff= localSearchStuff
    
}
else {
    searchStuff= props.results
}
if (localLatLng !== null){
    latLng=localLatLng
}else{
    latLng=props.latLong
}
if (localAddress !== null){
    searchAddress=localAddress
}else {
    searchAddress=props.address
}
// debugger;
useEffect(() => {
    console.log("FIREST THE EFFECTS!:", props, localSearchStuff, localLatLng);
        if (props.googleMapsReady) {
            // debugger;
            const gmap = createGoogleMap(latLng);
            const bounds = new window.google.maps.LatLngBounds();
            // debugger;
            searchStuff.data.trails.map(function(x){const marker = createMarker(x,gmap); 
                const loc = new window.google.maps.LatLng(
                    x.latitude, x.longitude
                    )
                    // debugger;
                    bounds.extend(loc);
                });
            gmap.fitBounds(bounds);
            gmap.panToBounds(bounds);
        }
}, [props.googleMapsReady, props, localSearchStuff, localLatLng, latLng, searchStuff]);


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
        <Container mw-75="true" mh-75="true" center="true" className="bg-white">
            <Row>
                <Col>
                    <h2>Hikes near {searchAddress}</h2>
                    <Container className="mb-3">
                        <Row>

                            <Col m-3="true" id="resultsDisplay">

                                {searchStuff.data.trails.map(x => props.generateResults(x))}
                            </Col>
                            <Col m-9>
                                <Card>
                                    {/* <CardTitle>Map Placeholder</CardTitle> */}
                                    <CardBody>
                                        <div
                                            id="google-map"
                                            ref={googleMapRef}
                                            style={{ width: '500px', height: '300px' }}
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


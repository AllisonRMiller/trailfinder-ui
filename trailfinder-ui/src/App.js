import React, { useState, useRef, useEffect } from 'react';
// import {GoogleApiWrapper} from 'google-maps-react';
//Import packages
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Row, Col, CardTitle, Button, Container, Card, CardSubtitle, Badge } from 'reactstrap';

// Import pages
import Landing from './landing';
import LoginForm from './login.js';
import SearchResults from './searchResults.js';
// import SignupForm from './signup.js';
import Trail from './trail.js';
import Error from './error.js';
import Dashboard from './dashboard.js';
import AllNav from './navbar.js';

// Import resources
import './App.css';

function App() {

  //State
  const [address, setAddress] = useState('');
  const [results, setResults] = useState({});
  const [latLong, setLatLong] = useState({});
  const [googleMapsReady, setGoogleMapsReady] = useState(false);
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  userInfo = userInfo ? userInfo : {};
  const [user, setUser] = useState(userInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState({});

  // const googleMapRef = useRef();

useEffect(() => {
  console.log("Are we logged in?: ", isLoggedIn);

}, [isLoggedIn]);


  const setUserInfo = (info) => {
    setUser(info);
    setIsLoggedIn(true);
    localStorage.setItem("userInfo", JSON.stringify(info))
  }

 const logged = () =>{
   var userStuff = JSON.parse(localStorage.getItem('userInfo'));
   var token = userStuff.token;
  //  debugger;
   console.log(token);
   if (token !== null){
     setIsLoggedIn(true);
    setAuth(JSON.parse(token))
   }
 }


  
  useEffect(() => {
    const loadGoogleMaps = (callback) => {
      const existingScript = document.getElementById('googleMaps');

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyATEgAhkU0SLNGbmzp5td2pC-VL2cZBot0&libraries=places';
        script.id = 'googleMaps';
        document.body.appendChild(script);

        script.onload = () => {
          if (callback) callback();
        };
      }

      if (existingScript && callback) callback();
    };
    loadGoogleMaps(() => { setGoogleMapsReady(true) })
  }, [])

  //Login



  //History
  const history = useHistory();

  //Stores the search location's name in state
  const handleChange = (e) => {
    // console.log(e);
    setAddress(e);

  };

  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  // const logout = () =>{

  // const logoutInfo = {
//headers: { Authorization: "Bearer " +auth.token}
  //}

  //   await axios.post(`http://localhost:8000/api/logout`, logoutInfo)
  //     .then(async function (response) {
  //       console.log(response);
  //       return response.data;
  //     })
  // }


  //Handle the "Take a Hike!" button click, execute geocoding, store lat/lng, trigger call to API
  const handleSearchClick = () =>
    geocodeByAddress(address)
      .then(result => getLatLng(result[0]))
      .then(latLng => phoneHome(latLng)
        // console.log("Success!", latLng)
      )
      .catch(error => console.error('Error: ', error));


  //Perform API call and provide paramaters, save response, and redirect to display page or error page
  const phoneHome = async (latLng) => {

    await axios.post(`http://localhost:8000/api/search`, latLng)
      .then(async function (response) {
        console.log(response);
        await setResults(response);
        await localStorage.setItem("results", JSON.stringify(response));
        setLatLong(latLng);
        localStorage.setItem("latLng", JSON.stringify(latLng));
        localStorage.setItem("address", JSON.stringify(address));
        // debugger;
        // pickRoute();
        if (response.data.success === 1 && response.data.trails.length !== 0) {
          history.push('/searchresults')
        }
        else {
          history.push('/error')
        }
      }
      )
      // .then(console.log(results))
      .catch(function (error) {
        console.log('Error: ', error);
        history.push('/error')
      })
  }

  //Displays a list of trails from provided data
  const generateResults = (x) => {
    var id = x.id
    var name = x.name
    var stars = x.stars
    var eStar = <FontAwesomeIcon icon={farStar} />
    var fStar = <FontAwesomeIcon icon={fasStar} />
    var difficulty = x.difficulty
    var badgecolor = x.difficulty
    if (x.difficulty === "black") {
      difficulty = "Difficult";
      badgecolor = "dark"
    }
    else if (x.difficulty === "blue") {
      difficulty = "Intermediate";
      badgecolor = "success"
    }
    else {
      difficulty = "Easy";
      badgecolor = "primary"
    }
    return (
      <Card key={id} id={id}>
        <Link to={{ pathname: "/trail/" + id }} className="stretched-link"><CardTitle text="dark">{name}</CardTitle></Link>
        <CardSubtitle>
          <Badge color={badgecolor} text="light">{difficulty}</Badge>
          <Rating
            initialRating={stars}
            emptySymbol={eStar}
            fullSymbol={fStar}
            readonly
            className="text-primary"
          />
        </CardSubtitle>
      </Card>
    )
  }



  // Router handling pathing to pages
  return (
    <div>
    <AllNav
    token={token}
    // isLoggedIn={isLoggedIn}
    // setAuth={setAuth}
    //   logged={logged}
     />
    <Switch>
      <Route exact path="/"
      >
        <Landing
      //       isLoggedIn={isLoggedIn}
      // logged={logged}
          handleChange={handleChange}
          handleSelect={handleSearchClick}
          address={address}
          googleMapsReady={googleMapsReady}
        // state={this.state}

        />
      </Route>
      <Route path="/login">
        <LoginForm
          setUserInfo={setUserInfo}
          isSignup={false}
        // state={this.state}
        />
      </Route>
      <Route path="/signup">
        <LoginForm
          setUserInfo={setUserInfo}

          isSignup={true}
        // login={signup}
        // state={this.state}

        />
      </Route>
      <Route path="/searchresults"
      >
        <SearchResults
            isLoggedIn={isLoggedIn}
      logged={logged}
          user={user}
          results={results}
          address={address}
          generateResults={generateResults}
          // createGoogleMap={createGoogleMap}
          // createMarker={createMarker}
          googleMapsReady={googleMapsReady}
          latLong={latLong}
        // state={this.state}

        />
      </Route>
      <Route path="/trail/:id">
        <Trail
    token={token}
          results={results}
          generateResults={generateResults}
          googleMapsReady={googleMapsReady}
        />
      </Route>
      <Route path="/error"
      >
        <Error 
              isLoggedIn={isLoggedIn}
      logged={logged}
        />
      </Route>
      <Route path="/dashboard">
        <Dashboard
                token={token}
          // user={user}
        />
      </Route>
      {/* <Route path="/logout">
        
      </Route> */}
      {/* <Route path="/homepage" render={props => 
  (<Homepage {...props} pieceOfState={this.state.pieceOfState}/>)
}/> */}
    </Switch></div>
  );
}

// Wrapper because this is the only way useHistory works ???
function Wrapper() {
  return <Router>
    <App></App>
  </Router>
}

export default Wrapper;


import React, { useState } from 'react';
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
import Landing from './landing';
import LoginForm from './login.js';
import SearchResults from './searchResults.js';
// import SignupForm from './signup.js';
import Trail from './trail.js';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [results, setResults] = useState({});
  const [latLong, setLatLong] = useState({})
  const handleChange = (e) => {
    // console.log(e);
    setAddress(e)
  };

  const history = useHistory();


  const handleSelect = () =>
    geocodeByAddress(address)
      .then(result => getLatLng(result[0]))
      .then(latLng => phoneHome(latLng)
        // console.log("Success!", latLng)
      )
      .catch(error => console.error('Error: ', error));

  const phoneHome = async (latLng) => {

    await axios.post(`http://localhost:8000/api/search`, latLng)
      .then(async function (response) {
        console.log(response);
        await setResults(response);
        setLatLong(latLng);
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

  // const pickRoute = () =>
  //   {
  //     if(results.data.success===1){
  //       history.push('/searchresults')
  //     }
  //     else{
  //       history.push('/error')
  //     }
  //   };
  // results.success === 1 ? <Redirect
  //     to={{
  //         pathname: "/searchresults",
  //         state: results
  //     }
  //     }
  // /> :
  //     <Redirect
  //         to={{
  //             pathname: "/error",
  //             state: results
  //         }
  //         }
  //     />;


  return (
    <Switch>
      <Route exact path="/"
      >
        <Landing
          handleChange={handleChange}
          handleSelect={handleSelect}
          address={address}
        // state={this.state}

        />
      </Route>
      <Route path="/login">
        <LoginForm
        // state={this.state}
        />
      </Route>
      <Route path="/signup">
        <LoginForm
        // state={this.state}

        />
      </Route>
      <Route path="/searchresults"
      >
        <SearchResults
          results={results}
          address={address}
          latLong={latLong}
        // state={this.state}

        />
      </Route>
      <Route path="/trail/:id">
        <Trail
          results={results}
        />
      </Route>
      {/* <Route path="/error"
        >
          <Error state={this.state}/>
        </Route> */}
      {/* <Route path="/homepage" render={props => 
  (<Homepage {...props} pieceOfState={this.state.pieceOfState}/>)
}/> */}
    </Switch>
  );
}
function Wrapper() {
  return <Router><App></App></Router>
}

export default Wrapper;

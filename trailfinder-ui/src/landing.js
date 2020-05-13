import React from 'react';
// import axios from 'axios';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Redirect
// } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Row, Col, Jumbotron, Button, Container, FormGroup, Form, Label, Input, Dropdown } from 'reactstrap';
import logo from './TrailfinderLogo2.png';
import './landing.css';


function Landing(props) {

  // const [address, setAddress] = useState('');
  // const [results, setResults] = useState({});
  // const handleChange = (e) => {
  //     // console.log(e);
  //     setAddress(e)
  // };



  // if (results.data.success === 1) {
  //     history.push('/searchresults')
  // }
  // else {

  //         <Redirect
  //             to={{
  //                 pathname: "/error"
  //             }
  //             }
  //         />



  // const handleSelect = () =>
  //     geocodeByAddress(address)
  //         .then(result => getLatLng(result[0]))
  //         .then(latLng => phoneHome(latLng)
  //             // console.log("Success!", latLng)
  //         )
  //         .catch(error => console.error('Error: ', error));

  // const phoneHome = async (latLng) => {
  //     await axios.post(`http://localhost:8000/api/search`, latLng)
  //         .then(function (response) {
  //             console.log(response);
  //             setResults(response);
  //         }
  //         )
  //         // .then(console.log(results))
  //         .catch(error => console.log('Error: ', error))
  //         .then(pickRoute())
  //     console.log(results);
  // }

  // const pickRoute = () =>
  //     results.success === 1 ? <Redirect
  //         to={{
  //             pathname: "/searchresults",
  //             state: results
  //         }
  //         }
  //     /> :
  //         <Redirect
  //             to={{
  //                 pathname: "/error",
  //                 state: results
  //             }
  //             }
  //         />;


  return (
    <div>
      <Row>
        <Col>
          <Jumbotron id="landing-jumbo" className="jumbotron-fluid text-center m-0 justify-content-center bg-dark text-light">
            <Container fluid>
              <img src={logo}></img>
              {/* <h1 className="display-3">Trailfinder</h1> */}
              <p className="lead mt-3">Find trails, plan trips. Easy.</p>
              {/* <hr className="my-2" /> */}
              <Row className="mt-5">
                <Col className="d-flex justify-content-center">
                  <Form className="w-25">
                    <FormGroup>
                      <Label>Where are you going?</Label>
                      <PlacesAutocomplete
                        value={props.address}
                        onChange={props.handleChange}
                      // onSubmit={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <Input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                            />
                            <Dropdown>
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active bg-info text-dark'
                                  : 'suggestion-item bg-light text-dark';
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,

                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </Dropdown>
                          </div>
                        )}
                      </PlacesAutocomplete>
                      {/* <Input //className="w-25"
                                            type="search"
                                            name="search"
                                            id="exampleSearch"
                                            placeholder="search placeholder"
                                        /> */}
                    </FormGroup>
                    <Button onClick={props.handleSelect} color="primary">Take a hike!</Button>
                    {/* Post user input to path */}
                  </Form>

                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </Col>
      </Row>
    </div>
  );
};


export default Landing;
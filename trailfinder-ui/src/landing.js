import React, {useEffect} from 'react';
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

  


  return (
    <Container fluid id="landing-jumbo">
      <Row>
        <Col>
          <Container fluid className="text-center mt-5 justify-content-center bg-none text-light">
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
                      {props.googleMapsReady &&
                      (<PlacesAutocomplete
                        value={props.address}
                        onChange={props.handleChange}
                      // onSubmit={handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div id="input" className="w-25">
                            <Input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                              })}
                            />
                            <Dropdown id="dropdown">
                              {loading && <div >Loading...</div>}
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
                      </PlacesAutocomplete>)
                      }
                      {/* <Input //className="w-25"
                                            type="search"
                                            name="search"
                                            id="exampleSearch"
                                            placeholder="search placeholder"
                                        /> */}
                    </FormGroup>
                    <Button className="mt-5" id="hike" onClick={props.handleSelect} color="primary">Take a hike!</Button>
                    {/* Post user input to path */}
                  </Form>

                </Col>
              </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};


export default Landing;
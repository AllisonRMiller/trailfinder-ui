import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from 'react-router-dom';
import { Row, Col, Jumbotron, Button, Container, FormGroup, Form, Label, Input } from 'reactstrap';
import logo from './TrailfinderLogo.png';

const Landing = (props) => {
    return (
        <div>
            <Row>
                <Col>
                    <Jumbotron id="landing-jumbo" className="text-center m-0 justify-content-center bg-dark text-light">
                        <Container fluid>
                            <h1 className="display-3"><img src={logo}></img>Trailfinder</h1>
                            <p className="lead">Find trails, plan trips. Easy.</p>
                            {/* <hr className="my-2" /> */}
                        <Row className="mt-5">
                            <Col className="d-flex justify-content-center">
                            <Form className="w-25">
                                    <FormGroup>
                                        <Label for="Search">Where are you going?</Label>
                                        <Input //className="w-25"
                                            type="search"
                                            name="search"
                                            id="exampleSearch"
                                            placeholder="search placeholder"
                                        />
                                    </FormGroup>
                                    <Button>Take a hike!</Button>
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
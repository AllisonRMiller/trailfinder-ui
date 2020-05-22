import React from 'react';
import { Row, Col, CardTitle, Container, Card, CardSubtitle, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import './error.css';

function Error(props) {



    return (

        <div id="overlay">
            <Jumbotron id="error-jumbo" className="jumbotron-fluid text-center m-0 justify-content-center bg-dark text-light">
                <Container fluid>
                    <Row className="mt-5 p-5">
                        <Col className="d-flex justify-content-center">
                            <Card id="error-message" className="borderless">
                                <CardTitle><h2>We've lost the trail!</h2></CardTitle>
                                <CardSubtitle className="p-3">Something went wrong. Please try again.</CardSubtitle>
                                <CardSubtitle>If you continue to receive this error, please <Link to="/" className="text-info"> contact support</Link>.</CardSubtitle>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </div>
    )
};

export default Error;
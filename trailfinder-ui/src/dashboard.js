import React, { useState } from 'react';
import { Row, Col, CardTitle, Button, Container, Card, CardBody, CardSubtitle, Badge, CardText } from 'reactstrap';


const Dashboard = (props) => {

    // console.log(props.user);

    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.user);


    return (
        <div id="userrender">
            <Container mw-75="true" mh-75="true" center="true" className="bg-white">
                <Row>
                    <Col>
                        <h2>Welcome {user.user.name}! </h2>
                        <Container>
                            <Row>

                                <Col className="m-3" id="userDisplay">
                                    <Card>
                                        <CardBody>
                                            <CardText>
                                                email: {user.user.email}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="m-9">
                                    <Card>
                                    <CardTitle>Trail list placeholder</CardTitle>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>

            </Container>
        </div>

    )
}

export default Dashboard;

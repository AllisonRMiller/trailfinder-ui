import React, { useState, useEffect } from 'react';
import { Row, Col, CardTitle, Button, Container, Card, CardBody, CardSubtitle, Badge, CardText } from 'reactstrap';
import axios from 'axios';
import {
    useHistory
} from 'react-router-dom';


const Dashboard = (props) => {

    // console.log(props.user);
    const [savedResponse, setSavedResponse] = useState()
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.user);
    debugger;
    useEffect(() => {
        phoneHome();
        debugger;
    }, [])


    const history = useHistory();

    const phoneHome = async () => {
        var user = JSON.parse(localStorage.getItem("userInfo"));

        const info = { user_id: user.user.id };


        await axios.post(`https://fleet-joy-276912.uk.r.appspot.com/api/viewSaved`, info)
            .then(async function (response) {
                debugger;
                console.log(response);
                debugger;
                await setSavedResponse(response.data);
                debugger;
                await localStorage.setItem("savedResponse", JSON.stringify(response.data))
                debugger;

                // {
                //               history.push('/searchresults')
                //             }
                //             else {
                //               history.push('/error')
                //             }
            }
            )
            // .then(console.log(results))
            .catch(function (error) {
                console.log('Error: ', error);
                // history.push('/error')
            })
    }



    //       var usedResponse= {};
    // var localResponse = {};
    // if (localStorage.getItem("savedResponse")!==null){
    //     localResponse = JSON.parse(localStorage.getItem("savedResponse"));
    //     debugger;
    // };
    // if (localResponse !== null){
    //     usedResponse= localResponse;
    //     debugger;

    // }
    // else {
    //     usedResponse= savedResponse
    // };

    debugger;
    return (
        <div id="userrender">
            <Container mw-75="true" mh-75="true" center="true" className="bg-white">
                <Row>
                    <Col>
                        <h2>Welcome {user.user.name}! </h2>
                        <Container>
                            <Row>

                                <Col className="md-3" id="userDisplay">
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
                                        <CardTitle>{savedResponse.data.trip.name}</CardTitle>
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

import React, { useState, useEffect } from 'react';
import { Row, Col, CardTitle, Button, Container, Card, CardBody, CardSubtitle, Badge, CardText } from 'reactstrap';
import axios from 'axios';
import {
    useHistory
} from 'react-router-dom';


const Dashboard = (props) => {

    // console.log(props.user);
    // const [savedResponse, setSavedResponse] = useState()
    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.user);

    // useEffect(() => {
    //     phoneHome()
    // }, [])


    // const history = useHistory();

    // const phoneHomeDash = async () => {
    //     var user = JSON.parse(localStorage.getItem("userInfo"));

    //     const info = { user_id: user.user.id };


    //     await axios.post(`http://localhost:8000/api/viewSaved`, info)
    //         .then(async function (response) {
    //             debugger;
    //             console.log(response);
    //             debugger;
    //             await setSavedResponse(response.data);
    //             debugger;
    //             await localStorage.setItem("savedResponse", JSON.stringify(response.data))
    //             debugger;

    //             // {
    //             //               history.push('/searchresults')
    //             //             }
    //             //             else {
    //             //               history.push('/error')
    //             //             }
    //         }
    //         )
    //         // .then(console.log(results))
    //         .catch(function (error) {
    //             console.log('Error: ', error);
    //             // history.push('/error')
    //         })
    // }



          var usedResponse= {};
    var localResponse = {};
    if (localStorage.getItem("savedResponse")!==null){
        localResponse = JSON.parse(localStorage.getItem("savedResponse"));
        // debugger;
    };
    if (localResponse !== null){
        usedResponse= localResponse;
        // debugger;

    }
    else {
        usedResponse= props.savedResponse
    };

    console.log(usedResponse);

    return (
        <div id="userrender" className="p-5" >
            <Container mw-75="true" mh-75="true" center="true" className="bg-white">
                <Row>
                    <Col>
                        <h2 className="mt-3 mb-3">Welcome {user.user.name}! </h2>
                        <Container className="mb-5">
                            <Row>

                                <Col className="col-md-4" id="userDisplay">
                                    <Card>
                                        <CardBody>
                                            <CardText>
                                                email: {user.user.email}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="col-md-8">
                                    <Card>
                                        <CardTitle>{usedResponse.trip.name}</CardTitle>
                                        {usedResponse.trails.map(x => props.generateResultsDash(x))}
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

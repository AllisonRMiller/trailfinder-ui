
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import "./login.css";

const LoginForm = (props) => {
  // let { place } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const buttonName = props.isSignup ? "Sign Up" : "Log In";


  const formControl = (e) => {
    if (props.isSignup) {
      registerUser(e);
    }
    else {
      loginUser(e);
    }
  }

  const loginUser = (e) => {
    e.preventDefault();
    const credentials = {
      // name: name,
      email: email,
      password: password,
    };

    axios.post('https://fleet-joy-276912.uk.r.appspot.com/api/login', credentials)
      .then(response => {
        props.setUserInfo(response.data);
        console.log("Logged in: ", response);
        props.phoneHomeDash();
        history.push("/dashboard");

      })
      .catch(errors => {
        console.log(errors);
        history.push("/error");
      });
  }

  const registerUser = async (e) => {
    e.preventDefault();
    const credentials = {
      name: name,
      email: email,
      password: password,
    };

     await axios.post('https://fleet-joy-276912.uk.r.appspot.com/api/register', credentials)
      .then(response => {
        props.setUserInfo(response.data);
        console.log("Registered: ", response);
        props.phoneHomeDash();
        history.push("/dashboard");

      })
      .catch(errors => {
        console.log(errors);
        history.push("/error");
      });
  }



  // console.log(props.isSignup);


  // var disp="d-none";
  // if 
  // Need some conditional rendering here for:
  // Button: says either log in or sign up based on the path
  // Either routes to login or to signup on Laravel API based on path
  // Name field: appears if the path is /signup
  return (
    <div id="logincontainer">
      <Container center="true" className="bg-white mt-5">
        <Row>
          <Col md-4="true" className="p-5 m-5">
            <Form onSubmit={formControl}>
              {props.isSignup && <FormGroup >
                <Label for="name">Name</Label>
                <Input type="name" onChange={(e) => setName(e.target.value)} name="name" id="name" />
              </FormGroup>}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="Password" />
              </FormGroup>
              <Button type="submit">{buttonName}</Button>
            </Form>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginForm;
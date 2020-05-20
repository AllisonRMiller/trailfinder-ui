
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = (props) => {
  // let { place } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const buttonName= props.isSignup ? "Sign Up" : "Log In";


  const formControl = (e) => {
    if (props.isSignup){
      registerUser(e);
    }
    else {
    loginUser(e);
  }
}

  const loginUser = (e) =>
  {
    e.preventDefault();
    const credentials = {
      // name: name,
      email: email,
      password: password,
    };

    axios.post('http://127.0.0.1:8000/api/login', credentials)
    .then(response => {
        props.setUserInfo(response.data);
        console.log("Logged in: ", response);
        history.push("/dashboard");

    })
    .catch(errors => {
        console.log(errors);
        history.push("/error");
    });
  }

  const registerUser = (e) =>
  {
    e.preventDefault();
    const credentials = {
      name: name,
      email: email,
      password: password,
    };

    axios.post('http://127.0.0.1:8000/api/register', credentials)
    .then(response => {
        props.setUserInfo(response.data);
        console.log("Registered: ", response);
        history.push("/dashboard");

    })
    .catch(errors => {
        console.log(errors);
        history.push("/error");
    });
  }



  console.log(props.isSignup);


  // var disp="d-none";
  // if 
// Need some conditional rendering here for:
// Button: says either log in or sign up based on the path
// Either routes to login or to signup on Laravel API based on path
// Name field: appears if the path is /signup
  return (
    
    <Form onSubmit={formControl}>
          {props.isSignup && <FormGroup >
        <Label for="name">Name</Label>
        <Input type="name" onChange={(e) => setName(e.target.value)} name="name" id="name"/>
      </FormGroup> }
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" id="email"/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" id="Password"/>
      </FormGroup>
      <Button type="submit">{buttonName}</Button>
    </Form>
    
  );
}

export default LoginForm;
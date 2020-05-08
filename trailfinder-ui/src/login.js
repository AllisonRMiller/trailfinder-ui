
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginForm = (props) => {
// Need some conditional rendering here for:
// Button: says either log in or sign up based on the path
// Either routes to login or to signup on Laravel API based on path
// Name field: appears if the path is /signup
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <Button>{}</Button>
    </Form>
  );
}

export default LoginForm;
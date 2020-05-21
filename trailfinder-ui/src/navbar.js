import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

const AllNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // Working on conditional rendering with hooks
  // Need to change appearance of login/signup if a user is already logged in

//  const logged = (props) =>{
//    var token = localStorage.getItem('userinfo.token');
//    console.log(token);
//    if (token !== null){
//      props.setIsLoggedIn(true);
//     props.setAuth(JSON.parse(token))
//    }
//  }



// useEffect(() => {
//     props.logged();
//     console.log(props.isLoggedIn)

// }, [props.isLoggedIn, props.logged, props])


  const userControls = () => {
    // logged();
    if (props.token !== null) {
      // debugger;
      return (
        <>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/logout">Logout</NavLink>
        </NavItem>
        </>
    )
    } else {
      // debugger;
      return (
        <>
        <NavItem>
          <NavLink href="/login">Log In</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/signup">Sign Up</NavLink>
        </NavItem>
        </>
        )

    }
  }



return (
  <div>
    <Navbar dark expand="md">
      <NavbarBrand href="/">Trailfinder</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar right="true">
          {userControls(props)}
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);
}

export default AllNav;
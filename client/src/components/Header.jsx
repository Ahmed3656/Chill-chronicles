import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '../images/navLogoBlack.png';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' className='header-style'>
      <Container fluid>
        <Navbar.Brand className='ms-5'>
          <Link to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='me-5'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav className='me-5'>
            <Link to="/profile/id" className="nav-link">Name Name</Link>
            <Link to="/create" className="nav-link">Create Post</Link>
            <Link to="/blogs" className="nav-link">Blogs</Link>
            <Link to="/authors" className="nav-link">Authors</Link>
            <Link to="/logout" className="nav-link">Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

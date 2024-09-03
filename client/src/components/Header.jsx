import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '../images/navLogoBlack.png';

const Header = () => {
  const { currUser } = useContext(UserContext);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const capitalize = (fullName) => {
    if (typeof fullName !== 'string') return '';
  
    const nameParts = fullName.trim().split(' ');
  
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    }
  
    const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1).toLowerCase();
  
    return `${firstName} ${lastName}`.trim();
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed='top' className='header-style' style={{ transform: showHeader ? 'translateY(0)' : 'translateY(-100%)'}}>
      <Container fluid>
        <Navbar.Brand className='ms-5'>
          <Link to="/">
            <img src={Logo} alt="Logo"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className='me-5'/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {currUser?.id ?
            <Nav className='me-5'>
              <Link to={`/profile/${currUser.id}`} className="nav-link">{capitalize(currUser.name)}</Link>
              <Link to="/create" className="nav-link">Create Post</Link>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              <Link to="/authors" className="nav-link">Authors</Link>
              <Link to="/logout" className="nav-link">Logout</Link>
            </Nav>
          :
            <Nav className='me-5'>
              <Link to="/blogs" className="nav-link">Blogs</Link>
              <Link to="/authors" className="nav-link">Authors</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

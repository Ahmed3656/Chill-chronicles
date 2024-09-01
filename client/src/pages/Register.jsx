import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '',
  })
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInput = (event) => {
    setUserData(prevState => {
      return {...prevState, [event.target.name] : event.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser) setError("couldn't register user. Please try again.");

      navigate('/login');
    }
    catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register-form" onSubmit={registerUser}>
          {error && <p className='form-error'>{error}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInput} />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInput} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInput} />
          <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInput} />
          <button className='meBtn meBtn-sm meBtn-primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register
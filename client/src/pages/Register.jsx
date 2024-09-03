import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';
import { TbEye, TbEyeClosed } from "react-icons/tb";

const Register = () => {
  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '',
  })
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {currUser} = useContext(UserContext);
  useEffect(() => {
    if(currUser) navigate(`/profile/${currUser.id}`);
  }, [])

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
          {error && <p className='form-error'>{error}.</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInput} />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInput} />
          <div className='password-container w-100' style={{position: 'relative'}}>
          <input type={showPassword? 'text' : 'password'} placeholder='Password' name='password' value={userData.password} onChange={changeInput} />
            {!showPassword && <TbEye onClick={() => setShowPassword(!showPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
            {showPassword && <TbEyeClosed onClick={() => setShowPassword(!showPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
          </div>
          <div className='password-container w-100' style={{position: 'relative'}}>
          <input type={showConfirmPassword? 'text' : 'password'} placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInput} />
            {!showConfirmPassword && <TbEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
            {showConfirmPassword && <TbEyeClosed onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
          </div>
          <button className='meBtn meBtn-sm meBtn-primary'>Register</button>
        </form>
        <small>Already have an account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}

export default Register
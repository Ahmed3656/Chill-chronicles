import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';
import { TbEye, TbEyeClosed } from "react-icons/tb";

const Login = () => {
  const [userData, setUserData] = useState({
    email : '',
    password : '',
  })
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {currUser, setCurrUser} = useContext(UserContext);

  useEffect(() => {
    if(currUser) navigate(`/profile/${currUser.id}`);
  }, [])

  const changeInput = (event) => {
    setUserData(prevState => {
      return {...prevState, [event.target.name] : event.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrUser(user);
      navigate('/');
    }
    catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login-form" onSubmit={loginUser}>
          {error && <p className='form-error'>{error}.</p>}
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInput} />
          <div className='password-container w-100' style={{position: 'relative'}}>
            <input type={showPassword? 'text' : 'password'} placeholder='Password' name='password' value={userData.password} onChange={changeInput} />
            {!showPassword && <TbEye onClick={() => setShowPassword(!showPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
            {showPassword && <TbEyeClosed onClick={() => setShowPassword(!showPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
          </div>
          <button className='meBtn meBtn-sm meBtn-primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up!</Link></small>
      </div>
    </section>
  )
}

export default Login
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({
    email : '',
    password : '',
  })

  const changeInput = (event) => {
    setUserData(prevState => {
      return {...prevState, [event.target.name] : event.target.value}
    })
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form className="form login-form">
          <p className='form-error'>This is the error message</p>
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInput} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInput} />
          <button className='meBtn meBtn-sm meBtn-primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to="/register">Sign up!</Link></small>
      </div>
    </section>
  )
}

export default Login
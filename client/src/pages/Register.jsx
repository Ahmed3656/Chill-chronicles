import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [userData, setUserData] = useState({
    name : '',
    email : '',
    password : '',
    password2 : '',
  })

  const changeInput = (event) => {
    setUserData(prevState => {
      return {...prevState, [event.target.name] : event.target.value}
    })
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register-form">
          <p className='form-error'>This is the error message</p>
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
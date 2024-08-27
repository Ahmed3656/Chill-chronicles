import React from 'react'

import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className='error-page'>
      <div className="center">
        <h2 style={{color : '#6f6af8', fontSize : '102px', marginBottom : '0'}}>OOPS!</h2>
        <h2>Page Not Found</h2>
        <Link to="/" className='meBtn meBtn-primary'>Go Back Home</Link>
      </div>
    </section>
  )
}

export default ErrorPage
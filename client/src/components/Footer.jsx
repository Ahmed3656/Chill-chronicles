import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <ul className='footer-categories'>
        <li><Link to = "/posts/categories/Finance">Finance</Link></li>
        <li><Link to = "/posts/categories/Business">Business</Link></li>
        <li><Link to = "/posts/categories/Education">Education</Link></li>
        <li><Link to = "/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link to = "/posts/categories/Art">Art</Link></li>
        <li><Link to = "/posts/categories/Technology">Technology</Link></li>
        <li><Link to = "/posts/categories/Sports">Sports</Link></li>
        <li><Link to = "/posts/categories/Uncategorized">Uncategorized</Link></li>
      </ul>
      <div className="footer-copyright">
        <small>2024 All Rights Reserved &copy; Copyright.</small>
      </div>
    </footer>
  )
}

export default Footer
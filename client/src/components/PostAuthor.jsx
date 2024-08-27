import React from 'react'
import { Link } from 'react-router-dom'

import avtr from '../images/avatar2.jpg'

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/id`} className='post-author'>
        <div className="author-avatar">
            <img src={avtr} alt="" />
        </div>
        <div className="author-details">
            <h6>By: Name Name</h6>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor
import React, { useState } from 'react'

import Card from 'react-bootstrap/Card';
import { authorsData } from '../data';
import { Link } from 'react-router-dom';

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);
  return (
    <section className="authors">
      {
      authors.length ?
      <div className="container d-flex row justify-content-around m-auto">
        {
          authors.map((author) => {
            return<Link key={author.id} to={`/posts/users/${author.id}`}  className='authors my-3 col-sm-12 col-md-6 col-lg-3'>
              <Card style={{ padding : '0.65rem', display : 'flex', flexDirection : 'row' }}>
                <Card.Img src={author.avatar} style={{width : '5.5rem', height : '100%', borderRadius : '50%'}} />
                <Card.Body>
                  <Card.Title>{author.name}</Card.Title>
                  <Card.Text><small>Number of posts:</small> {author.posts}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          })
        }
      </div>
      :
      <h2 className='text-center pt-5'>No users/authors found.</h2>
      }
    </section>
  )
}

export default Authors
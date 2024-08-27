import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import PostAuthor from '../components/PostAuthor';


import img from '../images/blog2.jpg'
import { DPosts } from '../data';

const AuthorPosts = () => {
  const [posts, setPosts] = useState(DPosts);
  return (
    <section className='container-fluid row space-around' style={{margin : 'auto'}}>
        {posts.length ? 
        (posts.map((post)=>
        <Card className='post-card col-lg-3 col-md-6 col-sm-12 mx-auto my-3' style={{ width: '21rem', padding : '0.65rem' }}>
            <Card.Img src={img} />
            <Card.Body>
                <Link to={`/posts/${post.id}`}>
                  <Card.Title className='card-title'>{post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}</Card.Title>
                  <Card.Text>{post.description.length > 145 ? post.description.substring(0, 170) + '...' : post.description}</Card.Text>
                </Link>
                <div className='d-flex justify-content-between' style={{margin : '2rem 0 -1rem 0', alignItems: 'flex-end'}}>
                    <PostAuthor />
                    <Link to={`/posts/categories/${post.category}`} className='meBtn category-btn'>{post.category.toUpperCase().substring(0,1) + post.category.substring(1)}</Link>
                </div>
            </Card.Body>
        </Card>
        
        ))
        :
        <h2 className='text-center pt-5'>No posts found</h2>
        }
    </section>
  )
}

export default AuthorPosts
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pic from '../images/blog13.jpg';
import { DPosts } from '../data';

const Dashboard = () => {
  const [posts, setPosts] = useState(DPosts);

  return (
    <section className='dashboard-container'>
      {
        posts.length ? 
          posts.map((post) => (
            <article key={post.id} className='dashboard-post'>
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={pic} alt="" />
                </div>
                <h5 className='truncate-text'>{post.title}</h5>
              </div>
              <div className="dashboard-post-btns">
                <Link to={`/posts/${post.id}`} className='meBtn meBtn-sm'>View</Link>
                <Link to={`/posts/${post.id}/edit`} className='meBtn meBtn-sm meBtn-primary'>Edit</Link>
                <Link to={`/posts/${post.id}/delete`} className='meBtn meBtn-sm meBtn-danger'>Delete</Link>
              </div>
            </article>
          ))
        : 
        <h2 className='text-center pt-5'>No posts found.</h2>
      }
    </section>
  );
}

export default Dashboard;

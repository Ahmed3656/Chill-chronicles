import React, { useEffect, useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import homeImage from '../images/home-main.png';

const Home = () => {
  const { currUser } = useContext(UserContext);
  const [path, setPath] = useState('');

  useEffect(() => {
    const tmpPath = (currUser? '/create' : '/register');
    setPath(tmpPath);
  }, [])

  useEffect(() => {
    const fadeUpElements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    fadeUpElements.forEach(element => {
      observer.observe(element);
    });
  }, []);

  return (
    <main className="home">
      <div className="home-welcome">
        <div className="home-welcome-img">
          <img src={homeImage} alt="" />
          <div className="welcome-image-btns text-center pt-5">
            <Link to={path} className='meBtn mx-2'>{currUser? 'Create a Blog' : 'Get Started'}</Link>
            <Link to="/blogs" className='meBtn mx-2'>{currUser? 'View Blogs' : 'Explore'}</Link>
          </div>
        </div>
      </div>
      <div className="home-create-blog fade-up mt-5">
        <div>
          <h2>How to create a blog for free</h2>
          <p>Follow these 4 steps to start blogging today.</p>
          { window.innerWidth > 800 ? <Link to={path} className='meBtn meBtn-primary'>Start Blogging</Link> : null }
        </div>
        <div>
          <ol>
            <li><strong>Sign up for a free blog maker.</strong> Choose what kind of blog you want to create.</li>
            <li><strong>Pick a blog name.</strong> Let people know what your blog is all about.</li>
            <li><strong>Write and publish your first post.</strong> Launch with posts you're passionate about.</li>
            <li><strong>Share your blog.</strong> Gain new readers and promote your blog on social media.</li>
          </ol>
        </div>
        { window.innerWidth < 800 ? <Link to={path} className='meBtn meBtn-primary mb-5'>Start Blogging</Link> : null }
        </div>
    </main>
  )
}

export default Home;
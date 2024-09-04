import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';
import LoadingPage from '../components/LoadingPage';
import DeletePost from './DeletePost';
import { IoIosArrowDropupCircle } from "react-icons/io";

import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const { id } = useParams();
  const {currUser} = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(response?.data);

        const authorResponse = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/users/${response?.data?.creator}`);
        setAuthor(authorResponse?.data);
      }
      catch (err) {
        setError(err);
      }
      setIsLoading(false);
    }

    fetchPost();
  }, [id]);

  const capitalize = (fullName) => {
    if (typeof fullName !== 'string') return '';
  
    const nameParts = fullName.trim().split(' ');
  
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    }
  
    const firstName = nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
    const lastName = nameParts[nameParts.length - 1].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].slice(1).toLowerCase();
  
    return `${firstName} ${lastName}`.trim();
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowTopButton(window.scrollY > 200? true : false);
    })
  })

  const moveToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <section className="post-details">
      {error && <p className='error'>{error}</p>}
      {isLoading?
        <LoadingPage />
      :
        (post && <div className="container post-details-container">
          <div className="post-details-header">
            
            <Link to={`/posts/users/${post.creator}`} className='post-author'>
              <div className="author-avatar">
                <img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar || 'nullPic.png'}`} alt={author?.name} />
              </div>
              <div className="author-details">
                <h6>By: {capitalize(author?.name)}</h6>
                <small><ReactTimeAgo date={new Date(post.createdAt)} locale='en-US' /></small>
              </div>
            </Link>

            {currUser?.id == post.creator && <div className="post-details-buttons">
              <Link to={`/posts/${id}/edit`} className='meBtn meBtn-sm meBtn-primary'>Edit</Link>
              <DeletePost postId={id} />
            </div>
            }
          </div>
          <h1>{post.title}</h1>
          <div className="post-details-thumbnail">
            <img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt='' />
          </div>
          <p dangerouslySetInnerHTML={{__html: post.description}}></p>
        </div>
        )
      }
      {showTopButton && <span className="to-top" onClick={moveToTop} style={{transition : 'all .5s linear'}}><IoIosArrowDropupCircle /></span>}
    </section>
  )
}

export default PostDetails
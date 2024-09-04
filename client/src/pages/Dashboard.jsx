import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

import LoadingPage from '../components/LoadingPage';
import DeletePost from './DeletePost';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const {currUser} = useContext(UserContext);
  const token = currUser?.token;

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token])

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BASE_URL}/posts/authors/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
        setPosts(response.data);
      }
      catch (err) {
        console.log(err);  
      }
      setIsLoading(false);
    }

    fetchPosts();
  }, [id, token])

  return (
    <section className='dashboard-container'>
      {isLoading?
        <LoadingPage />
      :
      (
        posts.length ? 
          posts.map((post) => (
            <article key={post.id} className='dashboard-post'>
              <div className="dashboard-post-info">
                <div className="dashboard-post-thumbnail">
                  <img src={`${import.meta.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                </div>
                <h5 className='truncate-text'>{post.title}</h5>
              </div>
              <div className="dashboard-post-btns">
                <Link to={`/posts/${post._id}`} className='meBtn meBtn-sm'>View</Link>
                <Link to={`/posts/${post._id}/edit`} className='meBtn meBtn-sm meBtn-primary'>Edit</Link>
                <DeletePost postId={post._id} />
              </div>
            </article>
          ))
        : 
        <h2 className='text-center pt-5'>No posts found.</h2>
      )    
      }
    </section>
  );
}

export default Dashboard;

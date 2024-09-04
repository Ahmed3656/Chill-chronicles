import React, { useEffect, useContext} from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const DeletePost = ({postId: id}) => {
  const navigate = useNavigate();
  const {currUser} = useContext(UserContext);
  const token = currUser?.token;
  const location = useLocation();

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status == 200) {
        if(location.pathname == `/myposts/${currUser.id}`) navigate(0);
        else navigate('/blogs');
      }
    }
    catch (err) {
      console.log(err);  
    }
  }

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token])

  return (
    <Link className='meBtn meBtn-sm meBtn-danger' onClick={() => deletePost(id)}>Delete</Link>
  )
}

export default DeletePost
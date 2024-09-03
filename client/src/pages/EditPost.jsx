import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const Categories = ['Finance', 'Business', 'Education', 'Entertainment', 'Art', 'Technology', 'Sports', 'Uncategorized'];
  const modules = {
    toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent' : '+1'}],
    ['link', 'image'],
    ['clean'],
    ]
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ]

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const navigate = useNavigate();
  const {currUser} = useContext(UserContext);
  const token = currUser?.token;

  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if(!token) navigate('/login');
  })

  useEffect(() => {
    setError('');
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        const post = response.data;

        setTitle(post.title);
        setCategory(post.category);
        setDescription(post.description);
        setThumbnail(post.thumbnail);
      }
      catch (err) {
        setError(err);
      }
    }
    
    fetchPost();
  }, [id])

  const editPost = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const editedPost = new FormData();
      editedPost.set('title', title);
      editedPost.set('category', category);
      editedPost.set('description', description);
      if(thumbnail) editedPost.set('thumbnail', thumbnail);
      
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, editedPost, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      
      setTitle('');
      setCategory('Uncategorized');
      setDescription('');
      setThumbnail('');
      
      navigate('/blogs');
    }
    catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form-error">{error}.</p>}
        <form className="form create-post-form" onSubmit={editPost}>
          <input type="text" placeholder='Title' value={title} onChange={event => setTitle(event.target.value)} autoFocus />
          <select name="category" value={category} onChange={event => setCategory(event.target.value)}>
            {
              Categories.map(c => <option key={c}>{c}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} style={{width: '100%'}} />
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} name='thumbnail' accept='png, jpg, jpeg' />
          <button type="submit" className='meBtn meBtn-primary'>Confirm Changes</button>
        </form>
      </div>
    </section>
  )
}

export default EditPost
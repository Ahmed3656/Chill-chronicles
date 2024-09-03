import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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

  useEffect(() => {
    if(!token) navigate('/login');
  }, [token])

  const createNewPost = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const postData = new FormData();
      postData.set('title', title);
      postData.set('category', category);
      postData.set('description', description);
      postData.set('thumbnail', thumbnail);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/create-post`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      
      setTitle('');
      setCategory('Uncategorized');
      setDescription('');
      setThumbnail('');
      
      navigate('/blogs');
    }
    catch (err) {
      setError(err);  
    }
  }
  
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form-error">{error}.</p>}
        <form className="form create-post-form" onSubmit={createNewPost}>
          <input type="text" placeholder='Title' value={title} onChange={event => setTitle(event.target.value)} autoFocus />
          <select name="category" value={category} onChange={event => setCategory(event.target.value)}>
            {
              Categories.map(c => <option key={c}>{c}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} style={{width: '100%'}} />
          <input type="file" onChange={event => setThumbnail(event.target.files[0])} accept='png, jpg, jpeg' />
          <button type="submit" className='meBtn meBtn-primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
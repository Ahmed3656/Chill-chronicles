import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Categories = ['Agriculture', 'Business', 'Education', 'Entertainment', 'Art', 'Investment', 'Weather', 'Uncategorized'];
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

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThubnail] = useState('');
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form-error">This is an error message</p>
        <form className="form create-post-form">
          <input type="text" placeholder='Title' value={title} onChange={event => setTitle(event.target.value)} autoFocus />
          <select name="category" value={category} onChange={event => setCategory(event.target.value)}>
            {
              Categories.map(c => <option key={c}>{c}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} style={{width: '100%'}} />
          <input type="file" onChange={event => setThubnail(event.target.files[0])} accept='png, jpg, jpeg' />
          <button type="submit" className='meBtn meBtn-primary'>Create</button>
        </form>
      </div>
    </section>
  )
}

export default CreatePost
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaEdit, FaCheck } from "react-icons/fa";
import avtr from '../images/avatar1.jpg';

const Profile = () => {
const [avatar, setAvatar] = useState(avtr);
const [name, setName] = useState ('');
const [email, setEmail] = useState('');
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <section className="profile">
      <div className="container profile-container">
        <Link to={`/myposts/id`} className='meBtn'>My Posts</Link>
        <div className="profile-details">
          <div className="avatar-wrapper">
            <div className="profile-avatar">
              <img src={avatar} alt="" />
            </div>
            <form className="form avatar-form">
              <input type="file" name='avatar' id='avatar' onChange={event => setAvatar(event.target.files[0])} accept='png, jpg, jpeg'/>
              <label htmlFor='avatar'><FaEdit /></label>
            </form>
            <button className="profile-avatar-btn"><FaCheck /></button>
          </div>
          <h1>Name Name</h1>

          <form className="form profile-form">
            <p className="form-error">This is an error</p>
            <input type="text" placeholder='Full Name' value={name} onChange={event => setName(event.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
            <input type="password" placeholder='Current Password' value={currentPassword} onChange={event => setCurrentPassword(event.target.value)} />
            <input type="password" placeholder='New Password' value={newPassword} onChange={event => setNewPassword(event.target.value)} />
            <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={event => setConfirmNewPassword(event.target.value)} />
            <button type="submit" className='meBtn meBtn-primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Profile
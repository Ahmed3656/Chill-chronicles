import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import LoadingPage from '../components/LoadingPage';

import { FaEdit, FaCheck } from "react-icons/fa";
import { TbEye, TbEyeClosed } from "react-icons/tb";

const Profile = () => {
const [avatar, setAvatar] = useState('');
const [name, setName] = useState ('');
const [email, setEmail] = useState('');
const [currPassword, setCurrPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmNewPassword, setConfirmNewPassword] = useState('');

const [changeAvatar, setChangeAvatar] = useState(false);
const [changePassword, setChangePassword] = useState(false);

const [showCurrPassword, setShowCurrPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

const navigate = useNavigate();
const { currUser } = useContext(UserContext);
const token = currUser?.token;

const [isLoading, setIsLoading] = useState(false);
const { id } = useParams();
const [error, setError] = useState('');

useEffect(() => {
  if(!token) navigate('/login');
}, [token])

const capitalize = (fullName) => {
  if (typeof fullName !== 'string') return '';

  const nameParts = fullName.trim().split(' ');

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1).toLowerCase();
  }

  nameParts.forEach((name, index)=> {
    nameParts[index] = name.charAt(0).toUpperCase() + name.slice(1);
  })

  const capName = nameParts.join(' ');

  return capName.trim();
};

useEffect(() => {
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      const {name, email, avatar} = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    catch (err) {
      console.log(err);  
    }
    setIsLoading(false);
  }

  fetchUser();
  }, [id, token])
  
  const changeAvatarHandler = async () => {
    setChangeAvatar(false);
    try {
      const postData = new FormData();
      postData.set('pfp', avatar);

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-pfp`, postData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      setAvatar(response?.data.avatar);
    }
    catch (err) {
      console.log(err);
    }
  }

  const updateInfo = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currPassword', currPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);
    
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
      
      setCurrPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      
      navigate('/logout');
    }
    catch (err) {
      setError(err?.response?.data.message);
    }
  }

  return (
    <section className="profile">
      {isLoading?
        <LoadingPage />
      :
        <div className="container profile-container">
          <Link to={`/myposts/${id}`} className='meBtn'>My Posts</Link>
          <div className="profile-details">
            <div className="avatar-wrapper">
              <div className="profile-avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar ? avatar : 'nullPic.png'}`} alt="" />
              </div>
              <form className="form avatar-form">
                <input type="file" name='avatar' id='avatar' onChange={event => setAvatar(event.target.files[0])} accept='png, jpg, jpeg'/>
                <label htmlFor='avatar' onClick={() => setChangeAvatar(true)}><FaEdit /></label>
              </form>
              {changeAvatar && <button className="profile-avatar-btn" onClick={changeAvatarHandler}><FaCheck /></button>}
            </div>
            <h1>{capitalize(currUser.name)}</h1>

            <form className="form profile-form" onSubmit={updateInfo}>
              {error && <p className="form-error">{error}.</p>}
              <input type="text" placeholder='Full Name' value={name} onChange={event => setName(event.target.value)} />
              <input type="email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)} />
              <div className='password-container w-100' style={{position: 'relative'}}>
                <input type={showCurrPassword? 'text' : 'password'} placeholder='Current Password' value={currPassword} onChange={event => setCurrPassword(event.target.value)} />
                {!showCurrPassword && <TbEye onClick={() => setShowCurrPassword(!showCurrPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
                {showCurrPassword && <TbEyeClosed onClick={() => setShowCurrPassword(!showCurrPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
              </div>
              {!changePassword && <p style={{cursor: 'pointer'}} onClick={()=>setChangePassword(!changePassword)}>Change password?</p>}
              {changePassword &&
              <div className='w-100'>
                <div className='password-container w-100' style={{position: 'relative'}}>
                  <input type={showNewPassword? 'text' : 'password'} className='mb-2' placeholder='New Password' value={newPassword} onChange={event => setNewPassword(event.target.value)} />
                  {!showNewPassword && <TbEye onClick={() => setShowNewPassword(!showNewPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
                  {showNewPassword && <TbEyeClosed onClick={() => setShowNewPassword(!showNewPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
                </div>
                <div className='password-container w-100' style={{position: 'relative'}}>
                  <input type={showConfirmNewPassword? 'text' : 'password'} className='mt-1' placeholder='Confirm New Password' value={confirmNewPassword} onChange={event => setConfirmNewPassword(event.target.value)} />
                  {!showConfirmNewPassword && <TbEye onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
                  {showConfirmNewPassword && <TbEyeClosed onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} style={{fontSize: '1.5rem', position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', cursor: 'pointer'}} />}
                </div>
              </div>
              }
              <button className='meBtn meBtn-primary'>Update details</button>
            </form>
          </div>
        </div>
      }
    </section>
  )
}

export default Profile
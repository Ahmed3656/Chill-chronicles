import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Profile from './pages/Profile';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import CategoryPosts from './pages/CategoryPosts';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout />,
    errorElement : <ErrorPage />,
    children : [
      { index : true, element : <Blogs /> },
      { path : "register", element : <Register /> },
      { path : "login", element : <Login /> },
      { path : "logout", element : <Logout /> },
      { path : "authors", element : <Authors /> },
      { path : "create", element : <CreatePost /> },
      { path : "posts/:id", element : <PostDetails /> },
      { path : "profile/:id", element : <Profile /> },
      { path : "posts/users/:id", element : <AuthorPosts /> },
      { path : "myposts/:id", element : <Dashboard /> },
      { path : "posts/:id/edit", element : <EditPost /> },
      { path : "posts/:id/delete", element : <DeletePost /> },
      { path : "posts/categories/:category", element : <CategoryPosts /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);
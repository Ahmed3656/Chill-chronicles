import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

const Layout = () => {
  return (
    <>
        <Header/>
        <ScrollToTop />
          <div className='main-content'>
            <Outlet/>
          </div>
        <Footer/>
    </>
  )
}

export default Layout
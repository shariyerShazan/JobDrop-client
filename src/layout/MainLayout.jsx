import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className='w-[90%] mx-auto'>
      <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout

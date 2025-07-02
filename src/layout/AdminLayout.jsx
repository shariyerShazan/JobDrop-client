
import React from 'react'
import Navbar from '../components/Navbar'
import SidebarForAdmin from '../components/SidebarForAdmin'
import { Outlet } from 'react-router'

function AdminLayout() {
  return (
    <div>
       <Navbar />
       <div className='grid grid-cols-30 gap-2 w-[90%] mx-auto'>
           <div className='col-span-6'>
           <SidebarForAdmin />
           </div>
            <div className='col-span-24'>
            <Outlet />
            </div>
       </div>
    </div>
  )
}

export default AdminLayout

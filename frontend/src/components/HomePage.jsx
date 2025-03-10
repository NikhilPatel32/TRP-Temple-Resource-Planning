import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
const HomePage = ({ toggle }) => {

  return (
    <div className={`fixed mt-1 ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'}`}>
      HomePage
    </div>
  )
}

export default HomePage

import React from 'react'
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const YatraPage = ({ toggle }) => {
    
  return (
    <div className={`fixed mt-1 ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'}`}>
    Yatra
  </div>
  )
}

export default YatraPage

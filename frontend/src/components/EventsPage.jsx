import React from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useState } from 'react';
const EventsPage = ({ toggle }) => {

  return (
    <div className={`fixed mt-1 ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'}`}>
     Events
    </div>
  )
}

export default EventsPage

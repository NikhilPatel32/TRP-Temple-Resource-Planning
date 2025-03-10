import React from 'react'

const DashBoard = ({ toggle }) => {
  
  return (
    <div className={`fixed mt-1 ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'}`}>
     DashBoard
    </div>
  )
}

export default DashBoard

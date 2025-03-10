import React from 'react';
import { Outlet } from 'react-router';

const Accounts = ({ toggle }) => {
  return (
    <div className={`fixed mt-1 flex flex-col ${(toggle) ? 'left-1/6 w-5/6' :'left-0 w-screen'}`}>
      <Outlet />
    </div>
  );
}

export default Accounts;

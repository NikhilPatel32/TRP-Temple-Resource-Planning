import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation , Navigate } from 'react-router';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';
import Accounts from './components/Accounts';
import YatraPage from './components/YatraPage';
import EventsPage from './components/EventsPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Transactions from './components/Transactions';
import Statistics from './components/Statistics';
import UpdatePage from './components/UpdatePage';

const Layout = ({ toggle, setToggle }) => {
  const location = useLocation();
  const noSidebarRoutes = ["/", "/signup"];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      { !hideSidebar && <Sidebar toggle={toggle} /> }

      <div className={`flex flex-col transition-all duration-300 ${(toggle && !hideSidebar) ? 'ml-1/6 w-5/6' : 'ml-0 w-screen'}`}>
        { !hideSidebar && <Navbar toggle={toggle} setToggle={setToggle} /> }

        <div className={`${(!hideSidebar) ? 'mt-16 p-5' : 'w-screen h-screen'}`}>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path="/home" element={<HomePage toggle={toggle} />} />
            <Route path="/dashBoard" element={<DashBoard toggle={toggle} />} />

            {/* by default go to transaction */}
            <Route path="/accounts" element={<Accounts toggle={toggle} />}>
              <Route index element={<Transactions toggle={toggle} />} />
               <Route path="transactions" element={<Transactions toggle={toggle} />} />
              <Route path="statistics" element={<Statistics toggle={toggle} />} />
         </Route>
            
            <Route path="/accounts/update/:id" element={<UpdatePage toggle={toggle}/>} />
            <Route path="/yatra" element={<YatraPage toggle={toggle} />} />
            <Route path="/events" element={<EventsPage toggle={toggle} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <Router>
      <Layout toggle={toggle} setToggle={setToggle} />
    </Router>
  );
};

export default App;

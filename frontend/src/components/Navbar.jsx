import React from 'react';
import { Menu , LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

const Navbar = ({ toggle, setToggle }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    alert("Logged out!");
    navigate('/'); 
  }

  return (
    <div className={`fixed top-0 right-0 h-auto p-5 border
       border-gray-400 flex items-center
      ${toggle ? 'left-1/6 w-5/6' : 'left-0 w-screen'}`}
    >

      <div className="text-3xl hover:text-blue-500 hover:scale-110 mr-auto
       active:scale-90 cursor-pointer transition-transform duration-300"
        onClick={() => setToggle(!toggle)}
      >
        <Menu />
      </div>

      <div className='ml-autu pr-10'>
      <button
        onClick={handleLogout}
        className="text-3xl hover:text-blue-500 hover:scale-110
       active:scale-90 cursor-pointer transition-transform duration-300"
      >
        <LogOut />
      </button>
      </div>

    </div>
  );
};

export default Navbar;

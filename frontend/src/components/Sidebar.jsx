import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown , ChevronUp } from 'lucide-react'

const Sidebar = ({ toggle }) => {
  const [selected , setSelected] = useState('');
  const [showSubMenu, setShowSubMenu] = useState(false);
  const navigate = useNavigate();

  function handleNavigation(component , path){
    setSelected(component);
    navigate(path)
   }


  return (
      
    toggle && 
      (
     <div className={`fixed top-0 left-0 p-5 min-h-screen flex
       flex-col gap-8 bg-amber-50 border items-center
       border-gray-300 text-black transition-all duration-300 
      ${toggle ? 'w-1/6' : 'w-0 overflow-hidden'}`
    }>

    <div className="relative text-6xl  font-extrabold text-amber-500">
      <span className="absolute -top-1 -left-1 text-amber-700 blur-sm select-none text-center">TRP</span>
      <span className="absolute top-1 left-1 text-amber-300 blur-sm text-center select-none">TRP</span>
      <span className="relative">TRP</span>
    </div>

      <div className={`p-3 text-xl ${selected !== 'Home' && 'hover:bg-blue-100 hover:font-bold'} 
      w-5/6 rounded-4xl h-auto text-center 
      hover:cursor-pointer ${selected === 'Home' && 'bg-blue-600 font-bold text-white' }`}
      onClick={() => handleNavigation('Home' , '/Home')}
      >
      Home
      </div>

      <div className={`p-3 text-xl
      ${selected !== 'DashBoard' && 'hover:bg-blue-100 hover:font-bold'} w-5/6 rounded-4xl h-auto text-center  hover:cursor-pointer ${selected === 'DashBoard' && 'bg-blue-600 font-bold text-white'}`}
        onClick={() => handleNavigation('DashBoard' , '/DashBoard')}>
      DashBoard
      </div>

      <div className={`p-3 text-xl flex justify-center items-center
      ${selected !== 'Accounts' && 'hover:bg-blue-100 hover:font-bold'} w-5/6 rounded-4xl h-auto text-center 
       hover:cursor-pointer ${selected === 'Accounts' && 'bg-blue-600 font-bold text-white'}`}
        onClick={() => {
          handleNavigation('Accounts' , '/Accounts');
          setShowSubMenu(!showSubMenu)}}>
      Accounts 
      <div className='text-xl'>{showSubMenu ? <ChevronDown /> : <ChevronUp />}</div>
      </div>

      {showSubMenu && (
          <div className="w-5/6 flex flex-col gap-2">
            <div
              className={`p-3 text-lg bg-blue-100 rounded-4xl text-center ${selected !=='Transactions' && 'hover:bg-blue-300 hover:font-bold'} cursor-pointer
              ${selected === 'Transactions' && 'bg-blue-600 font-bold text-white'}`}
              onClick={() => handleNavigation("Transactions", "/accounts/transactions")}
            >
              Transactions
            </div>
            <div
               className={`p-3 text-lg bg-blue-100 rounded-4xl text-center ${selected !=='Statistics' && 'hover:bg-blue-300 hover:font-bold'} cursor-pointer
               ${selected === 'Statistics' && 'bg-blue-600 font-bold text-white'}`}
              onClick={() => handleNavigation("Statistics", "/accounts/statistics")}
            >
              Statistics
            </div>
          </div>
        )}

      <div className={`p-3 text-xl
      ${selected !== 'Yatra' && 'hover:bg-blue-100 hover:font-bold'} w-5/6 rounded-4xl h-auto text-center  hover:cursor-pointer ${selected === 'Yatra' && 'bg-blue-600 font-bold text-white'}`}
      onClick={() => handleNavigation('Yatra' , '/Yatra')}>
          Yatra
       </div>

      <div className={`p-3 text-xl
      ${selected !== 'Events' && 'hover:bg-blue-100 hover:font-bold'} w-5/6 rounded-4xl 
      h-auto text-center  hover:cursor-pointer ${selected === 'Events' && 'bg-blue-600 font-bold text-white'}`}
        onClick={() => handleNavigation('Events' , '/Events')}>
          Events
          </div>

          </div>
          )
    // </div>
  )
}

export default Sidebar

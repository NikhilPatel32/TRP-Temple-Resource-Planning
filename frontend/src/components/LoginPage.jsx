import React, { useState } from 'react'
import loginImage from '../assets/loginImage.png'
import { Eye , EyeClosed } from 'lucide-react';
import { useNavigate } from 'react-router';
import { loginUser } from '../api/auth';


const LoginPage = () => {
  const [isOpen , setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [identifier , setIdentifier] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Sign In button clicked!"); //debug
    try {
      const userData = { username: identifier, email: identifier, password };
      const response = await loginUser(userData);

      console.log(response) //debug
      console.log(response.accessToken) //debug 

      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        alert('Login successful!');
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed! Check credentials.');
    }
  };

    return (
      <div className='h-screen w-screen flex justify-center items-center'
      style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
      }}>
         
         <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-1/3 h-3/5 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h1 className='font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 drop-shadow-lg tracking-wider text-center shadow-[0_0_20px_rgba(255,200,0,0.7)]'>TRP</h1>

        <div className='w-full pt-5'>
        <input type="text" 
        placeholder='Username or Email' 
        className="w-full p-3 bg-amber-100/20  rounded-3xl 
        text-gray-800 placeholder-gray-800 border-none outline-none"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        />
        </div>
        
        <div className='w-full pt-5 flex justify-between'>
       <input type={isOpen ? 'text' : 'password'}  
        placeholder= 'password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 bg-amber-100/20  rounded-3xl
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        <button className='text-gray-800 hover:cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <Eye /> : <EyeClosed />}
          </button>
        </div>

        <div className='w-full pt-5'>
       <button
        className="w-full p-3 bg-amber-100/80 rounded-3xl
         hover:cursor-pointer hover:bg-gray-200"
         onClick={handleLogin}
       >
       Sign In
       </button>
        </div>
      
      <div className='flex w-full p-3 justify-between text-gray-800'>
        <p>Don't have an account?</p>
        <strong className='hover:cursor-pointer hover:text-gray-600'
        onClick={() => navigate("/signup")}>
        Sign Up
        </strong>
      </div>
      </div>
      </div>
    )
  }
  
  export default LoginPage
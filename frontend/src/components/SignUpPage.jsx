import React, { useState } from "react";
import {Eye , EyeClosed} from 'lucide-react'
import signUpImage from "../assets/signUpImage.png";
import { useNavigate } from "react-router";
import { registerUser } from '../api/auth';
const SignUpPage = () => {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [contact , setContact] = useState('');
    const [role , setRole] = useState('');
    const [password , setPassword] = useState('');
    const [isOpen , setIsOpen] = useState(true);
    const navigate = useNavigate();
   
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !contact || !role || !password) {
        alert("All fields are required!");
        return;
      }

      try {
        const userData = { 
          username : name,
           email, 
           phone : contact,
            role,
             password
             };
        const response = await registerUser(userData);
        alert('Registration successful!');
        navigate('/');
      } catch (error) {
        alert('Registration failed! Try again.');
      }
    };

  return (
    <div
      className="h-screen w-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${signUpImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="flex flex-col absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 
    w-1/3 h-4/5 bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg"
      >
        <form onSubmit={handleSubmit}>
          <h1
            className="font-extrabold text-5xl text-transparent 
        bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600
        drop-shadow-lg tracking-wider text-center
        shadow-[0_0_20px_rgba(135,206,235,0.7)]"
        >
        TRP
        </h1>

        <div className='w-full pt-5'>
        <input type="text" 
        placeholder='Username'
        value={name} 
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 bg-amber-100/40  rounded-3xl 
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        </div>

        <div className='w-full pt-5'>
        <input type="email" 
        placeholder='Email'
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 bg-amber-100/40  rounded-3xl 
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        </div>

        <div className='w-full pt-5'>
        <input type="tel" 
        placeholder='Phone Number'
        value={contact} 
        onChange={(e) => setContact(e.target.value)}
        className="w-full p-3 bg-amber-100/40  rounded-3xl 
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        </div>

        <div className='w-full pt-5'>
        <input type="text" 
        placeholder='Enter your Role'
        value={role} 
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 bg-amber-100/40  rounded-3xl 
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        </div>

        <div className='w-full pt-5 flex relative'>
       <input type={isOpen ? 'text' : 'password'}  
        placeholder= 'password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 bg-amber-100/40  rounded-3xl
        text-gray-800 placeholder-gray-800 border-none outline-none"
        />
        <button className='absolute right-5 top-1/2
         hover:cursor-pointer text-gray-800'
         type="button"
        onClick={ (e) =>{ e.preventDefault(); 
        () => setIsOpen((prev) => !prev)} }>
          {isOpen ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        
        <div className='w-full pt-5'>
       <button
       type="submit"
        className="w-full p-3 bg-amber-100/80 rounded-3xl 
                  hover:cursor-pointer hover:bg-gray-200"
        >
       Register
       </button>
        </div>

        <div className="text-gray-800 pt-4 hover:cursor-pointer
         hover:underline text-center"
         onClick={() => navigate("/")}>
          Go back to login
        </div>
       
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

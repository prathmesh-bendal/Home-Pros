import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
export default function ForgotPassWord() {
  
  const [email,setEmail]=useState("");
  
  function onChange(e)
  {
    setEmail(e.target.value)
  }
  async function onSubmit(e)
  {
    e.preventDefault();
    try{
      const auth=getAuth();
      await sendPasswordResetEmail(auth,email)
      toast.success("Reset email was sent")
    }
    catch(error)
    {
      toast.error("Could notreset password")
    }
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Forgot Password</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/photo-1634224143538-ce0221abf732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzc3dvcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' alt='Fotgot Password!' className='w-full rounded-xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input type='email' id='email' value={email} onChange={onChange} placeholder='Email Address' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white rounded'/>
            
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Don't have an account?<Link to="/sign-up" className='text-red-600 hover:text-red-700 ml-1'>Register</Link></p>
              <p>
                <Link to="/sign-in" className='text-blue-600 hover:text-blue-800 ml-1'>Sign in</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800'>Send Reset Password</button>
            <div className='my-4 before:border-t flex before:flex-1 items-center before:border-gray-400 after:flex-1 after:border-t after:border-gray-400'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}

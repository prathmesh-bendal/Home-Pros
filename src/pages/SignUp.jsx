import React, { useState } from 'react'
import {AiFillEyeInvisible , AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth , createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
export default function SignUp() {
  const navigate=useNavigate();
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  });
  const {name,email,password}=formData;
  function onChange(e)
  {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth();
      const userCredentials= await createUserWithEmailAndPassword(auth,email,password);
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user=userCredentials.user;
      const formDatacopy={...formData};
      delete formDatacopy.password;
      formDatacopy.timestamp=serverTimestamp();

      await setDoc(doc(db,"users",user.uid),formDatacopy);
      //toast.success("Sign Up Successfull")
      navigate("/");
    }
    catch (error)
    {
      toast.error("something went wrong")
    }
  }
  
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src='https://images.unsplash.com/photo-1634224143538-ce0221abf732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzc3dvcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' alt='Fotgot Password!' className='w-full rounded-xl'/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          <input type='text' id='name' value={name} onChange={onChange} placeholder='Full Name' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white rounded'/>
            <input type='email' id='email' value={email} onChange={onChange} placeholder='Email Address' className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white rounded'/>
            <div className='relative mb-6'>
            <input type={showPassword? 'text': 'password'} id='password' value={password} onChange={onChange} placeholder='Password' className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded' />
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) :(<AiFillEye className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>)}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?<Link to="/sign-in" className='text-red-600 hover:text-red-700 ml-1'>Sign in</Link></p>
              <p>
                <Link to="/forgot-password" className='text-blue-600 hover:text-blue-800 ml-1'>Forgot Password?</Link>
              </p>
            </div>
            <button type='submit' className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800'>SIGN UP</button>
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

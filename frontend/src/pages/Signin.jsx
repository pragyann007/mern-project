import React, { useState } from 'react'
import {toast,ToastContainer} from "react-toastify"

import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { serverPath } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from 'react-spinners';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState();




  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd"
  const handlegoogleAuth = async () => {
    try {
      setLoading(true)

      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post(`${serverPath}/api/auth/googleauth`, {
        email: result.user.email,


      }, { withCredentials: true })
      console.log(res)
      setLoading(false)
      setMobile("");
      toast.success("User signup Sucess !!")

           

    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
       toast.error("Signup error !!")

    }
  }

  const handleSignIn = async () => {


    try {
      setLoading(true)
      const result = await axios.post(`${serverPath}/api/auth/signin`, { email, password }, { withCredentials: true })
      console.log(result)
      setErr("")
      setLoading(false);
       toast.success("User signin Sucess !!")
          setEmail("");
          setMobile("");
          setPassword("");
          setfullName("");
    } catch (error) {
      setErr(error.response.data.message)
      setLoading(false)
            toast.error("Signin error !!")
      

    }
  }

  return (
    <div className='min-h-screen w-full  flex items-center justify-center p-4  '
      style={{ backgroundColor: bgColor }}>

      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8  '
        style={{ border: `1 solid ${borderColor}` }}
      >
        <h1 className='text-3xl font-bold mb-2' style={{ color: primaryColor }} >Vingo</h1>

        <p className='text-gray-800 mb-8'> Create your account to get started with delecious food deliveries.</p>




        {/* email  */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="email">Email </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ border: `1 solid ${borderColor}` }} type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Email' />
        </div>





        {/* password */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="password">Password </label>

          <div className='relative'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ border: `1 solid ${borderColor}` }}

              type={!showPassword ? "password" : "text"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Password ' />


            <button
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-2.5 text-gray-500 cursor-pointer transition-all '>
              {showPassword == false ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>

        </div>


        <div
          onClick={() => navigate("/forgot-password")}
          className='cursor-pointer text-right mb-4 font-medium text-[#ff4d2d]' >Forgot Password </div>

        <p className='text-red-600 font-bold text-md text-center my-4 ' >*{err}</p>

        <button
          disabled={loading}
          onClick={handleSignIn}
          className={`w-full bg-[#ff4d2d] mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer text-white hover:bg-[#e64323] `} >
          {loading ? <ClipLoader size={20} /> : "SignUp"}
          SignUp </button>

        <button
          onClick={handlegoogleAuth}
          className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 tranistion duration-200 cursor-pointer border-gray-200 hover:bg-gray-200'>
          <FcGoogle size={20} />
          <span>Signin with google</span>
        </button>
        <p className='cursor-pointer text-center mt-6 '>Don't  have an Account ?  <span onClick={() => navigate("/signup")} className='text-[#ff4d2d]'>Sign Up </span></p>
      </div>
<ToastContainer/>

    </div>
  )
}

export default SignIn
import React, { useState } from 'react';
import {toast,ToastContainer} from "react-toastify"
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { serverPath } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"

const Signup = () => {
  const navigate = useNavigate();
  const[fullName,setfullName] = useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[mobile,setMobile] = useState("")
  const [err,setErr] = useState("")




  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user")
  const [loading,setLoading] =useState(false)

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd"


  const handlegoogleAuth = async ()=>{
    try {
      if (!mobile){
        return setErr("Mobile number must be provided ! ")
      }
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth,provider);
      
      const res = await axios.post(`${serverPath}/api/auth/googleauth`,{
        email:result.user.email,
      

      },{withCredentials:true});
      setMobile("");
      toast.success("User signup Sucess !!")
     

      console.log(res)
      
    } catch (error) {
      console.log("Google signup errro " , error)
      toast.error("Signup error !!")

      
    }
  }
 
  const handleSignUp = async ()=>{

    try {
      setLoading(true)

    const result = await axios.post(`${serverPath}/api/auth/signup`,{fullName,email,password,mobile},{withCredentials:true})
    console.log(result)
    setErr("");
    setLoading(false)
    toast.success("User signup Sucess !!")
    setEmail("");
    setMobile("");
    setPassword("");
    setfullName("");

      
    } catch (error) {
      setErr(error.response.data.message);
      setLoading(false)
      toast.error("Signup error !!")
      
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

        {/* fullName  */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="fullName">Full Name </label>
          <input
          value={fullName}
          onChange={(e)=>setfullName(e.target.value)}
          style={{ border: `1 solid ${borderColor}` }} type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your full name ' />
        </div>


        {/* email  */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="email">Email </label>
          <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ border: `1 solid ${borderColor}` }} type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Email' />
        </div>

        {/* mobile */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="mobile">Mobile </label>
          <input
          value={mobile}
          onChange={(e)=>{
            setMobile(e.target.value)
            
          }}
          style={{ border: `1 solid ${borderColor}`, marginBottom:8 }} type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Mobile No ' />
          {mobile==""?<span className='mt-4 text-red-600 '>You must Enter Mobile number to signin with google .</span>
          :""
          }
          
        </div>

        {/* password */}

        <div className='mb-4 '>
          <label
            className='block text-gray-700 font-medium mb-1 '
            htmlFor="password">Password </label>

          <div className='relative'>
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{ border: `1 solid ${borderColor}` }}

              type={!showPassword ? "password" : "text"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Password ' />


            <button
              onClick={() => setShowPassword(prev => !prev)}
              className='absolute right-3 top-2.5 text-gray-500 cursor-pointer transition-all '>
              {showPassword == false ? <FaRegEye /> : <FaEyeSlash />}
            </button>
          </div>

        </div>


        {/* role */}

        <div className='mb-4 '>
          <label
            className='mt-2 block text-gray-700 font-medium mb-1 '
            htmlFor="role">Role</label>

          <div className='mt-4 flex gap-2'>
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                onClick={() => setRole(r)}
                style={
                  role == r ? { backgroundColor: primaryColor, color: 'white' } : { border: `1px solid ${primaryColor}`, color: "#333" }
                }
                className='flex-1 border cursor-pointer rounded-lg px-3 py-2 text-center font-medium transition-colors ' >{r}</button>
            ))}
          </div>

        </div>
        <p className='text-red-600 font-bold text-md text-center my-4 ' >*{err}</p>
        <button
        onClick={handleSignUp}
        className={`w-full bg-[#ff4d2d] mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer text-white hover:bg-[#e64323] `} >
          {loading?<ClipLoader size={20} />:"Signup "}
           </button>

            <button 
            disabled={loading}
            onClick={handlegoogleAuth}
            className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 tranistion duration-200 cursor-pointer border-gray-200 hover:bg-gray-200'>
              <FcGoogle size={20}/>
              <span>Signup with google</span>
            </button>
            <p className='cursor-pointer text-center mt-6 '>Already have an Account ?  <span onClick={()=>navigate("/signin")} className='text-[#ff4d2d]'>Sign In </span></p>
      </div>

<ToastContainer/>

    </div>
  )
}

export default Signup
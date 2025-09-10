import React, { useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { serverPath } from '../App';

import axios from "axios"
const ForgotPassword = () => {

    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd"
    const [email, setEmail] = useState("")
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState()
    const [newPassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("");

    const handleStep1 = async () => {
        try {
            setLoading(true)
            const result = await axios.post(`${serverPath}/api/auth/sendotp`, { email }, { withCredentials: true })
            console.log(result);
            setOtp(result.data.otp)
            setStep(2);
            setErr("")
            setLoading(false)

        } catch (error) {
            setErr(error.response.data.message);
            setLoading(false)
        }
    }


    const handleStep2 = async () => {
        try {
            setLoading(true)
            const result = await axios.post(`${serverPath}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
            console.log(result);
            setStep(3)
            setErr("")
            setLoading(false)
            

        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    }
    const handlePasswordResetStep3 = async () => {
        try {
            setLoading(true)
            if (newPassword != confirmpassword) {
                return null
            }
            const result = await axios.post(`${serverPath}/api/auth/resetPassword`, { email, newPassword }, { withCredentials: true })
            console.log(result);
            navigate("/signin")
            setErr("")
        } catch (error) {
            setErr(error.response.data.message)
            setLoading(false)
        }
    
        
    
    }

    return (
    
        <div className='flex w-full items-center bg-[#fff9f6] justify-center min-h-screen p-4 '>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div
                    onClick={() => navigate("/signin")}
                    className='cursor-pointer flex items-center gap-4 mb-4 '>
                    <IoArrowBackSharp size={30} className='text-[#ff4d2d]' />
                    <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password </h1>
    
    
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mb-6 '>
                            <label
                                className='block text-gray-700 font-medium mb-1 '
                                htmlFor="email">Email </label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
    
                                style={{ border: `1 solid ${borderColor}` }} type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your Email' />
    
                        </div>
                        <p className='text-red-600 font-bold text-md text-center my-4 ' >*{err}</p>
    
                        <button
                            onClick={handleStep1}
                            className={`w-full bg-[#ff4d2d] mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer text-white hover:bg-[#e64323] `} > Send OTP </button>
    
                    </div>
                }
    
                {step == 2
                    &&
                    <div>
                        <div className='mb-6 '>
                            <label
                                className='block text-gray-700 font-medium mb-1 '
                                htmlFor="otp">Enter OTP </label>
                            <input
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
    
                                style={{ border: `1 solid ${borderColor}` }} type="number" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Enter your OTP' />
    
                        </div>
                        <p className='text-red-600 font-bold text-md text-center my-4 ' >*{err}</p>
    
                        <button
                            onClick={handleStep2}
    
                            className={`w-full bg-[#ff4d2d] mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer text-white hover:bg-[#e64323] `} >Verify OTP</button>
    
                    </div>
                }
    
                {step == 3
                    &&
                    <div>
                        <div className='mb-6 '>
                            <label
                                className='block text-gray-700 font-medium mb-1 '
                                htmlFor="newpassword">New Password </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
    
                                style={{ border: `1 solid ${borderColor}` }} type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='New Password' />
    
                        </div>
    
                        <div className='mb-6 '>
                            <label
                                className='block text-gray-700 font-medium mb-1 '
                                htmlFor="confirmpassword">Confirm Password </label>
                            <input
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
    
                                style={{ border: `1 solid ${borderColor}` }} type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500  ' placeholder='Reset Password' />
    
                        </div>
                        <p className='text-red-600 font-bold text-md text-center my-4 ' >*{err}</p>
    
                        <button
                            onClick={handlePasswordResetStep3}
    
                            className={`w-full bg-[#ff4d2d] mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 cursor-pointer text-white hover:bg-[#e64323] `} >Reset Password </button>
    
                    </div>
                }
    
            </div>
        </div>
    )

}







export default ForgotPassword
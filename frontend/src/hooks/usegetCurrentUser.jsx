import axios from 'axios'
import React, { useEffect } from 'react'
import { serverPath } from '../App'

const usegetCurrentUser = () => {
  useEffect(()=>{
    const fetchUser = async ()=>{
        try {
            const result = await axios.get(`${serverPath}/api/auth/current-user`,{withCredentials:true})
            console.log(result)
            return result
            
        } catch (error) {
            console.log("Errorr ..")
            
        }



    }

    fetchUser(); 

  },[])
}

export default usegetCurrentUser
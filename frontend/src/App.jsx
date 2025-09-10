import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom"
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import usegetCurrentUser from './hooks/usegetCurrentUser'

export const serverPath = "http://localhost:8080"
function App() {
  const [count, setCount] = useState(0)
  usegetCurrentUser();

  return (
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='forgot-password' element={<ForgotPassword/>} />
    </Routes>
  
  )
}

export default App

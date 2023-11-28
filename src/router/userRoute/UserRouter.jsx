import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from '../../containers/userPage/userLogin'
import OtpPage from '../../containers/userPage/OtpPage'
import Home from '../../containers/userPage/userHome'
import Signup from '../../containers/userPage/userSignUp'

function UserRouter() {
  return (
    <Routes>
        <Route path='/otp' element={<OtpPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
    </Routes>
  )
}

export default UserRouter

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VendorPrivate from './VendorPrivate'
import VendorDashboardPage from '../../pages/vendorPages/VendorDashboardPage'
import VendorSignUpPage from '../../pages/vendorPages/VendorSignUpPage'
import VendorLoginPage from '../../pages/vendorPages/VendorLoginPage'
import VendorOtpPage from '../../pages/vendorPages/VendorOtpPage'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard/' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>} />
        <Route path='/signup' element={<VendorSignUpPage/>}/>
        <Route path='/login' element={<VendorLoginPage/>}/>
        <Route path='/otp' element={<VendorOtpPage/>}/>
        <Route path='/profile/:partnername' element={<VendorDashboardPage/>}/>
    </Routes>
  )
}

export default VendorRouter;

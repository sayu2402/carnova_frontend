import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VendorPrivate from './VendorPrivate'
import VendorDashboardPage from '../../pages/vendorPages/VendorDashboardPage'
import VendorSignUpPage from '../../pages/vendorPages/VendorSignUpPage'
import VendorLoginPage from '../../pages/vendorPages/VendorLoginPage'
import VendorOtpPage from '../../pages/vendorPages/VendorOtpPage'
import AddCarPage from '../../pages/vendorPages/AddCarPage'
import VendorProfilePage from '../../pages/vendorPages/VendorProfilePage'
import VendorCarDeatilPage from '../../pages/vendorPages/VendorCarDeatilPage'
import VendorCarEditPage from '../../pages/vendorPages/VendorCarEditPage'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard/' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>} />
        <Route path='/signup' element={<VendorSignUpPage/>}/>
        <Route path='/login' element={<VendorLoginPage/>}/>
        <Route path='/otp' element={<VendorOtpPage/>}/>
        <Route path='/profile/:partnername' element={<VendorDashboardPage/>}/>
        <Route path='/profile/:partnername/add-car' element={<AddCarPage/> } />
        <Route path='/profile/:partnername/car-details' element={<VendorCarDeatilPage/> } />
        <Route path='/profile/:partnername/car-edit' element={<VendorCarEditPage/> } />
    </Routes>
  )
}

export default VendorRouter;

import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VendorPrivate from './VendorPrivate'
import VendorDashboardPage from '../../pages/vendorPages/VendorDashboardPage'
import VendorSignUpPage from '../../pages/vendorPages/VendorSignUpPage'
import VendorLoginPage from '../../pages/vendorPages/VendorLoginPage'
import VendorOtpPage from '../../pages/vendorPages/VendorOtpPage'
import AddCarPage from '../../pages/vendorPages/AddCarPage'
import VendorCarDeatilPage from '../../pages/vendorPages/VendorCarDeatilPage'
import VendorCarEditPage from '../../pages/vendorPages/VendorCarEditPage'
import BookingListPage from '../../pages/vendorPages/BookingListPage'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard/' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>} />
        <Route path='/signup' element={<VendorSignUpPage/>}/>
        <Route path='/login' element={<VendorLoginPage/>}/>
        <Route path='/otp' element={<VendorOtpPage/>}/>
        <Route path='/profile/:partnername' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>}/>
        <Route path='/profile/:partnername/add-car' element={<VendorPrivate><AddCarPage/></VendorPrivate> } />
        <Route path='/profile/:partnername/car-details' element={<VendorPrivate><VendorCarDeatilPage/></VendorPrivate> } />
        <Route path='/profile/:partnername/car-edit/:carId' element={<VendorPrivate><VendorCarEditPage/></VendorPrivate> } />
        <Route path='/profile/:partnername/booking-list' element={<VendorPrivate><BookingListPage/></VendorPrivate> } />
    </Routes>
  )
}

export default VendorRouter;

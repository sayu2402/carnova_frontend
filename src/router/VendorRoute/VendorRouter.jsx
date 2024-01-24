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
import VendorChatPage from '../../pages/vendorPages/VendorChatPage'
import BookingSingleViewVendorPage from '../../pages/vendorPages/BookingSingleViewVendorPage'
import NotificationCarAproved from '../../containers/vendor/NotificationCarAproved'
import DisplayUserIDCardPage from '../../pages/vendorPages/DisplayUserIDCardPage'

function VendorRouter() {
  return (
    <>
    <NotificationCarAproved/>
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
        <Route path='/chat/inbox' element={<VendorPrivate><VendorChatPage/></VendorPrivate> } />
        <Route path='/booking-details/:bookingId' element={<VendorPrivate><BookingSingleViewVendorPage/></VendorPrivate> } />
        <Route path='/booking-details/user-id-card' element={<VendorPrivate><DisplayUserIDCardPage/></VendorPrivate> } />
    </Routes>
    </>
  )
}

export default VendorRouter;

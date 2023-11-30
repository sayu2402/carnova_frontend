import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VendorPrivate from './VendorPrivate'
import VendorDashboardPage from '../../pages/vendorPages/VendorDashboardPage'
import VendorSignUpPage from '../../pages/vendorPages/VendorSignUpPage'
import VendorLoginPage from '../../pages/vendorPages/VendorLoginPage'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>} />
        <Route path='/signup' element={<VendorSignUpPage/>}/>
        <Route path='/login' element={<VendorLoginPage/>}/>
    </Routes>
  )
}

export default VendorRouter;

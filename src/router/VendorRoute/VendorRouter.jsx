import React from 'react'
import { Routes, Route } from 'react-router-dom'

import VendorPrivate from './VendorPrivate'
import VendorDashboardPage from '../../pages/vendorPages/VendorDashboardPage'
import VendorSignUpPage from '../../pages/vendorPages/VendorSignUpPage'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard' element={<VendorPrivate><VendorDashboardPage/></VendorPrivate>} />
        <Route path='/signup' element={<VendorSignUpPage/>}/>
    </Routes>
  )
}

export default VendorRouter;

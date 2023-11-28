import React from 'react'
import { Routes, Route } from 'react-router-dom'
import VendorDashboard from '../../containers/vendorPage/VendorDashboard'

import VendorPublic from './VendorPublic'
import VendorPrivate from './VendorPrivate'
import SignupPartner from '../../containers/vendorPage/VendorSignup'

function VendorRouter() {
  return (
    <Routes>
        <Route path='/dashboard' element={<VendorPrivate><VendorDashboard/></VendorPrivate>} />
        <Route path='/signup' element={<VendorPublic><SignupPartner/></VendorPublic>}/>
    </Routes>
  )
}

export default VendorRouter;

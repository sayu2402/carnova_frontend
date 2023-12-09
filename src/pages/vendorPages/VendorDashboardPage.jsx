import React from 'react'
import VendorDashboard from '../../containers/vendor/VendorDashboard'
import Footer from '../../containers/common/Footer'
import NavBar from '../../containers/common/NavBar'
import VendorProfile from '../../containers/vendor/VendorProfile'

function VendorDashboardPage() {
  return (
    <>
      <NavBar />
      <VendorProfile/>
      <VendorDashboard/>
      <Footer />
    </>
  )
}

export default VendorDashboardPage
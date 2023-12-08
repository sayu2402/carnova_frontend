import React from 'react'
import VendorDashboard from '../../containers/vendor/VendorDashboard'
import Footer from '../../containers/common/Footer'
import NavBar from '../../containers/common/NavBar'

function VendorDashboardPage() {
  return (
    <>
      <NavBar />
      <VendorDashboard/>
      <Footer />
    </>
  )
}

export default VendorDashboardPage

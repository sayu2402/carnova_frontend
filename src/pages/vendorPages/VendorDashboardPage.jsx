import React from 'react'
import VendorDashboard from '../../containers/vendor/VendorDashboard'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'

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

import React from 'react'
import NavBar from '../../containers/common/NavBar'
import VendorProfile from '../../containers/vendor/VendorProfile'
import Footer from '../../containers/common/Footer'
import VendorCarDetails from '../../containers/vendor/VendorCarDetails'

function VendorCarDeatilPage() {
  return (
    <>
      <NavBar />
      <VendorProfile/>
      <VendorCarDetails/>
      <Footer />
    </>
  )
}

export default VendorCarDeatilPage

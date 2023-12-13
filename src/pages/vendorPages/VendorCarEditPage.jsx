import React from 'react'
import NavBar from '../../containers/common/NavBar'
import VendorProfile from '../../containers/vendor/VendorProfile'
import VendorCarEdit from '../../containers/vendor/VendorCarEdit'
import Footer from '../../containers/common/Footer'

function VendorCarEditPage() {
  return (
    <>
      <NavBar />
      <VendorProfile/>
      <VendorCarEdit/>
      <Footer />
    </>
  )
}

export default VendorCarEditPage

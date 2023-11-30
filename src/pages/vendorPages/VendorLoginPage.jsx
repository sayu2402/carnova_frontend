import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import VendorLogin from '../../containers/vendor/VendorLogin'

function VendorLoginPage() {
  return (
    <>
      <NavBar />
      <VendorLogin/>
      <Footer />
    </>
  )
}

export default VendorLoginPage

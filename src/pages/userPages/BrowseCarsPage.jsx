import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import BrowseCar from '../../containers/user/BrowseCar'
import SearchArea from '../../containers/user/SearchArea'

function BrowseCarsPage() {
  return (
    <>
      <NavBar />
      <SearchArea/>
      <BrowseCar/>
      <Footer />
    </>
  )
}

export default BrowseCarsPage

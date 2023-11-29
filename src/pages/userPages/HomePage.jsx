import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import Home from '../../containers/user/userHome'

function HomePage() {
  return (
    <>
      <NavBar />
      <Home/>
      <Footer />
    </>
  )
}

export default HomePage

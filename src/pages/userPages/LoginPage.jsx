import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import Login from '../../containers/user/userLogin'

function LoginPage() {
  return (
    <>
      <NavBar />
      <Login/>
      <Footer />
    </>
  )
}

export default LoginPage

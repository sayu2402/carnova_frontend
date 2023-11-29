import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import Signup from '../../containers/user/userSignUp'

function UserSignUpPage() {
  return (
    <>
      <NavBar />
      <Signup/>
      <Footer />
    </>
  )
}

export default UserSignUpPage

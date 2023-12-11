import React from 'react'
import NavBar from '../../containers/common/NavBar'
import UserDashboard from '../../containers/user/UserDashboard'
import Footer from '../../containers/common/Footer'
import UserBookingsDetails from '../../containers/user/UserBookingsDetails'

function UserBookingDetailsPage() {
  return (
    <>
      <NavBar />
      <UserDashboard />
      <UserBookingsDetails/>
      <Footer />
    </>
  )
}

export default UserBookingDetailsPage

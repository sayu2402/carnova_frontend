import React from 'react'
import NavBar from '../../containers/common/NavBar'
import Footer from '../../containers/common/Footer'
import VendorProfile from '../../containers/vendor/VendorProfile'
import BookingList from '../../containers/vendor/BookingList'

function BookingListPage() {
  return (
    <>
      <NavBar />
      <VendorProfile />
      <BookingList />
      <Footer />
    </>
  )
}

export default BookingListPage

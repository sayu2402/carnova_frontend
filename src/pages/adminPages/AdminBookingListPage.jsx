import React from 'react'
import AdminNavBar from '../../containers/common/AdminNavBar'
import AdminFooter from '../../containers/common/AdminFooter'
import AdminSidebar from '../../containers/common/AdminSidebar'
import AdminBookingList from '../../containers/admin/AdminBookingList'

function AdminBookingListPage() {
  return (
<>
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ">
          <AdminBookingList />
        </div>
      </div>

      <AdminFooter />
    </>
  )
}

export default AdminBookingListPage

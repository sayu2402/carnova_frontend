import React from 'react'
import AdminNavBar from '../../containers/common/AdminNavBar'
import AdminSidebar from '../../containers/common/AdminSidebar'
import CarList from '../../containers/admin/CarList'
import AdminFooter from '../../containers/common/AdminFooter'
import CarDetailsAdmin from '../../containers/admin/CarDetailsAdmin'

function CarDetailPageAdmin() {
  return (
    <>
    <AdminNavBar />
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow ">
        <CarDetailsAdmin />
      </div>
    </div>

    <AdminFooter />
  </>
  )
}

export default CarDetailPageAdmin

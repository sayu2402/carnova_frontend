import React from 'react'
import CarList from '../../containers/admin/CarList'
import AdminSidebar from '../../containers/common/AdminSidebar'
import AdminNavBar from '../../containers/common/AdminNavBar'
import AdminFooter from '../../containers/common/AdminFooter'

function CarsListPage() {
  return (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-grow ">
          <CarList />
        </div>
      </div>

      <AdminFooter />
    </>
  )
}

export default CarsListPage

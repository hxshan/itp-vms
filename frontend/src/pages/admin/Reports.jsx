import React from 'react'
import {UserReportTable,DriverRecReportTable} from '../../components/admin'
const Reports = () => {
  return (
    <div className="container mx-auto py-10 min-h-full">
        <UserReportTable/>
        <DriverRecReportTable/>
    </div>
  )
}

export default Reports
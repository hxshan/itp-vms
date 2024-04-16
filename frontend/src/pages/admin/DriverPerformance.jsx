import { AddDriverRecordForm, DriverRecordTable, DriverTable } from '@/components/admin'
import React, { useState } from 'react'

const DriverPerformance = () => {
  const [recordOpen,setRecordOpen]= useState(false)
  return (
    <div className="container mx-auto pb-10 min-h-full  mt-8" >
        <AddDriverRecordForm isOpen={recordOpen}/>
        <DriverTable/>
        <DriverRecordTable isOpen={recordOpen} setIsOpen={setRecordOpen}/>
        
    </div>
  )
}

export default DriverPerformance
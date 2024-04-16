import { AddDriverRecordForm, DriverRecordTable, DriverTable } from '@/components/admin'
import React, { useState } from 'react'
import { useEffect } from 'react'

const DriverPerformance = () => {
  const [recordOpen,setRecordOpen]= useState(false)
  const [reload,setReload] = useState(0)
  useEffect(()=>{
    setRecordOpen(false)
  },[reload])
  return (
    <div className="container pb-10 min-h-full pt-8 relative" >
        <AddDriverRecordForm isOpen={recordOpen} setIsOpen={setRecordOpen} reload={reload} setReload={setReload}/>
        <DriverTable/>
        <DriverRecordTable isOpen={recordOpen} setIsOpen={setRecordOpen} reload={reload}/>
   
    </div>
  )
}

export default DriverPerformance
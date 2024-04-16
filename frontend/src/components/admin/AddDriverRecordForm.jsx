import React from 'react'

const AddDriverRecordForm = ({isOpen}) => {
  return (
    <div className={isOpen ?'fi w-full h-full bg-gray-300 bg-opacity-20 z-50': 'hidden'}>
        <div className='bg-white rounded-md '>
            <form>


            </form>
        </div>
    </div>
  )
}

export default AddDriverRecordForm
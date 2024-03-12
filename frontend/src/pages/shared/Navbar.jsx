import React from 'react'

const Navbar = () => {
  return (
    <div className=" fixed top-0 left-0 flex h-full w-80">
      <div className="h-screen bg-gray-800 text-white w-64 flex flex-col items-start ">
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
          User Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Vehicle Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Maintenance  Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Hire  Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Emergency Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
            Contract Managment
        </button>
        <button className="w-full py-4 px-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
          Finance Management
        </button>
      </div>
    </div>
  )
}

export default Navbar
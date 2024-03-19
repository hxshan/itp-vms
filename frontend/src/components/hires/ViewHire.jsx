import PropTypes from 'prop-types';

const ViewHire = ({setViewHire , viewHireData}) => {

    ViewHire.propTypes = {
        setViewHire: PropTypes.func.isRequired,
        viewHireData: PropTypes.object.isRequired
      };

    const cancel = () => {
        setViewHire(false)
      }

  return (
    <div className=" absolute bg-white border-2 border-[#0E6300] w-[75%] mb-6 top-11 right-11 xl:top-5">
         <div className=' xl:flex xl:flex-col justify-between mx-10 my-5'>
              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Trip Details</h1>

                <div className=' xl:flex justify-between'>
                  <div>
                    <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {viewHireData.startDate} </p>
                    <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {viewHireData.endDate}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp;{viewHireData.vehicleType}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Sub-Catagory : &nbsp;&nbsp; {viewHireData.vehicleSubcategory}</p>
                    <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {viewHireData.airCondition ? "Yes" : "No"}</p>
                    <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {viewHireData.passengerCount}</p>
                  </div>

                  <div>
                    <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {viewHireData.vehicle}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Model: &nbsp;&nbsp; BMW 5</p>
                    <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {viewHireData.driver}</p>
                    <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp; {viewHireData.startPoint}</p>
                    <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {viewHireData.endPoint}</p>
                    <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {viewHireData.tripType ? "yes" : "No"}</p>
                    <p className=' text-lg font-semibold leading-8'>Distence : &nbsp;&nbsp; {viewHireData.distance}</p>
                  </div>
                </div>
                
                
                
              </div>

              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Customer Details</h1>

                
                <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {viewHireData.cusName}</p>
                <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {viewHireData.cusEmail}</p>
                <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {viewHireData.cusMobile}</p>
                <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {viewHireData.cusNic}</p>

              </div>

              <div className='mr-[20px] mt-10 flex justify-between items-baseline'>  
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 " onClick={cancel}>Cancel</button> 
                <button className="px-7 py-2 bg-[#0E6300] text-white rounded-md mr-4">Edit</button>
                <button className="px-4 py-2 bg-[#A90000] text-white rounded-md mr-4">Delete</button>

              </div>
              
              </div>
    </div>
  )
}

export default ViewHire
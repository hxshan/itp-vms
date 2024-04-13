import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef  } from 'react';
import ReactToPrint from "react-to-print";


const ViewHire = ({setViewHire , viewHireData}) => {

    ViewHire.propTypes = {
        setViewHire: PropTypes.func.isRequired,
        viewHireData: PropTypes.object.isRequired
      };

      const navigate = useNavigate()
      const [reload, setReload] = useState(false);

    const cancel = () => {
        setViewHire(false)
      }

    const handleEdit = () => {
      navigate(`/hires/edit/${viewHireData._id}`, {state: {viewHireData} })
    }

    useEffect(() => {
      if (reload) {
          window.location.reload();
      }
  }, [reload])

  const ref = useRef(null);

  return (
    <div>
        <div className=" absolute  bg-white border-2 border-[#0E6300] w-[75%] mb-6 top-11 right-11 xl:top-5">
         <div className=' xl:flex xl:flex-col justify-between mx-10 my-5' >

          <div ref={ref} className='mx-10 my-5'>
              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Trip Details</h1>

                <div className=' xl:flex justify-between'>
                  <div>
                  <p className=' text-lg font-semibold leading-8'>Hire ID : &nbsp;&nbsp; {viewHireData._id} </p>
                    <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {new Date(viewHireData.startDate).toLocaleDateString()} </p>
                    <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {new Date(viewHireData.endDate).toLocaleDateString()}</p>
                    <p className=' text-lg font-semibold leading-8'>Start Time : &nbsp;&nbsp; {viewHireData.startTime}</p>
                    <p className={`text-lg font-semibold leading-8 ${viewHireData.endTime === '' ? 'hidden' : 'block' }`}>End Time : &nbsp;&nbsp; {viewHireData.endTime}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp;{viewHireData.vehicleType}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Sub-Catagory : &nbsp;&nbsp; {viewHireData.vehicle.vehicleType}</p>
                    <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {viewHireData.airCondition ? "Yes" : "No"}</p>
                    <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {viewHireData.passengerCount}</p>
                  </div>

                  <div>
                    <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {viewHireData.vehicle?.vehicleRegister || 'N/A'}</p>
                    <p className=' text-lg font-semibold leading-8'>Vehicle Model: &nbsp;&nbsp; BMW 5</p>
                    <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {viewHireData.driver?.firstName || 'N/A'}</p>
                    <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp; {viewHireData.startPoint.no} {viewHireData.startPoint.street} {viewHireData.startPoint.city}</p>
                    <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {viewHireData.endPoint}</p>
                    <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {viewHireData.tripType ? "yes" : "No"}</p>
                    <p className=' text-lg font-semibold leading-8'>distance : &nbsp;&nbsp; {viewHireData.distance}</p>
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

              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Payment info</h1>

                
                <p className=' text-lg font-semibold leading-8'>Status : &nbsp;&nbsp; {viewHireData.hireStatus}</p>
                <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp; {viewHireData.estimatedTotal}</p>
                <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp; {viewHireData.advancedPayment}</p>
                <p className={`text-lg font-semibold leading-8 ${viewHireData.finalTotal === null ? 'hidden' : 'block' }`}>Final Total : &nbsp;&nbsp; {viewHireData.finalTotal}</p>

              </div>

          </div>
              

              <div className='mr-[20px] mt-10 flex justify-between items-baseline'>  
                <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 " onClick={cancel}>Cancel</button> 
                <button className="px-7 py-2 bg-[#0E6300] text-white rounded-md mr-4" onClick={handleEdit}>Edit</button>
               

                <ReactToPrint
                    bodyClass="print-agreement"
                    content={() => ref.current}
                    trigger={() => (
                      <button className="px-4 py-2 text-white bg-black hover:bg-gray-800 focus:outline-none rounded-md mr-4">Print</button>
                    )}
                  />
              </div>
              
          </div>
        </div>
    </div>
  )
}

export default ViewHire
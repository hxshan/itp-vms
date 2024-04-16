import PropTypes from 'prop-types';
import { useRef } from 'react';
import ReactToPrint from "react-to-print";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'

Modal.setAppElement('#root'); // Set the root app element for screen readers

const ViewHire = ({ setViewHire, viewHireData }) => {
    ViewHire.propTypes = {
        setViewHire: PropTypes.func.isRequired,
        viewHireData: PropTypes.object.isRequired
    };

    const ref = useRef(null);
    const navigate = useNavigate()

    const cancel = () => {
        setViewHire(false);
    };

    const handleEdit = () => {
      navigate(`/hires/edit/${viewHireData._id}`, {state: {viewHireData} })
    };

    return (
        <Modal
            isOpen={true} // Open the modal
            onRequestClose={() => setViewHire(false)} // Close the modal on escape key press or overlay click
            style={{
              content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  borderWidth: '2px',
                  borderColor: 'green-600',
                  width: '80%',
                  height: '90%',
                  marginBottom: 'mb-6',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: 'p-6'
              },
              overlay: {
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  backgroundColor: 'transparent',
                  bgOpacity: '50',
                  zIndex: '50',
                  backdropFilter: 'blur(4px)',
              },
          }}
        >
            <div ref={ref} className="p-6">

                {/* Trip Details */}
                <div className="mb-6">
                    <h1 className="text-2xl underline font-bold text-center mb-5">Trip Details</h1>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-* items-center mx-10 w-full justify-items-stretch ">           
                          <p className=' text-lg font-semibold leading-8'>Hire ID : &nbsp;&nbsp; {viewHireData._id} </p>
                          <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {new Date(viewHireData.startDate).toLocaleDateString()} </p>
                          <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {new Date(viewHireData.endDate).toLocaleDateString()}</p>
                          <p className=' text-lg font-semibold leading-8'>Start Time : &nbsp;&nbsp; {viewHireData.startTime}</p>
                          <p className={`text-lg font-semibold leading-8 ${viewHireData.endTime === '' ? 'hidden' : 'block'}`}>Start Time : &nbsp;&nbsp; {viewHireData.startTime}</p>
                          <p className={`text-lg font-semibold leading-8 ${viewHireData.endTime === null ? 'hidden' : 'block' }`}>End Time : &nbsp;&nbsp; {viewHireData.endTime}</p>
                          <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp;{viewHireData.vehicleType}</p>
                          <p className=' text-lg font-semibold leading-8'>Vehicle Sub-Catagory : &nbsp;&nbsp; {viewHireData.vehicle.vehicleType}</p>
                          <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {viewHireData.airCondition ? "Yes" : "No"}</p>
                          <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {viewHireData.passengerCount}</p>
                          <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {viewHireData.vehicle?.vehicleRegister || 'N/A'}</p>
                          <p className=' text-lg font-semibold leading-8'>Vehicle Model: &nbsp;&nbsp; BMW 5</p>
                          <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {viewHireData.driver?.firstName || 'N/A'}</p>
                          <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp; {viewHireData.startPoint.no} {viewHireData.startPoint.street} {viewHireData.startPoint.city}</p>
                          <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {viewHireData.endPoint}</p>
                          <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {viewHireData.tripType ? "yes" : "No"}</p>
                          <p className=' text-lg font-semibold leading-8'>Estimated Distance : &nbsp;&nbsp; {viewHireData.estimatedDistance}</p>
                          <p className= {`text-lg font-semibold leading-8 ${viewHireData.actualDistance === null ? 'hidden' : 'block'}`}>Distance : &nbsp;&nbsp; {viewHireData.actualDistance}</p>
                      
                    </div>

                    <div className= {`grid-cols-2 gap-y-3 gap-x-* items-center mx-10 w-full justify-items-stretch mt-2 ${viewHireData.intialOdometerReading === null & viewHireData.finalOdometerReading === null ? 'hidden' : 'grid'}`}>
                            <p className=' text-lg font-semibold leading-8'>Odometer Reading(Start) : &nbsp;&nbsp; {viewHireData.intialOdometerReading}</p>
                            <p className=' text-lg font-semibold leading-8'>Odometer Reading(End) : &nbsp;&nbsp; {viewHireData.finalOdometerReading}</p>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="mb-6 mx-10">
                    <h1 className="text-2xl underline font-bold text-center mb-5">Customer Details</h1>
                    <div className='mr-[20px]'>                      
                      <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {viewHireData.cusName}</p>
                      <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {viewHireData.cusEmail}</p>
                      <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {viewHireData.cusMobile}</p>
                      <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {viewHireData.cusNic}</p>

                    </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6 mx-10">
                    <h1 className="text-2xl underline font-bold text-center mb-5">Payment info</h1>
                    <div className='mr-[20px]'>
                      <p className=' text-lg font-semibold leading-8'>Status : &nbsp;&nbsp; {viewHireData.hireStatus}</p>
                      <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp; {viewHireData.estimatedTotal}</p>
                      <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp; {viewHireData.advancedPayment}</p>
                      <p className={`text-lg font-semibold leading-8 ${viewHireData.finalTotal === null ? 'hidden' : 'block' }`}>Final Total : &nbsp;&nbsp; {viewHireData.finalTotal}</p>

                    </div>
                </div>
            </div>

            <div className="my-4 mx-5 flex justify-between">
              <button className="py-2 px-6 bg-actionBlue text-white rounded-md mr-4" onClick={cancel}>Cancel</button>
              <button className="py-2 px-6 bg-actionGreen text-white rounded-md mr-4" onClick={handleEdit}>Edit</button>

              <ReactToPrint
                bodyClass="print-agreement"
                content={() => ref.current}
                trigger={() => (
                <button className="py-2 px-6 text-white bg-actionRed focus:outline-none rounded-md mr-4">Print</button>
                )}
                />
            </div>
        </Modal>
    );
}

export default ViewHire;

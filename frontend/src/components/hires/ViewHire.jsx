import PropTypes from 'prop-types';


const ViewHire = ({setViewHire}) => {

    ViewHire.propTypes = {
        setViewHire: PropTypes.func.isRequired,
      };

    const cancel = () => {
        setViewHire(false)
      }

  return (
    <div className=" absolute bg-slate-400 w-[75%]">
         <div className=' xl:flex justify-between mx-10 my-5'>
              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Trip Details</h1>

                <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>Vehicle Sub-Catagory : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp;</p>
                <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>Distence : &nbsp;&nbsp; </p>

              </div>

              <div className='mr-[20px]'>
                <h1 className="text-2xl underline font-bold text-center mb-5">Customer Details</h1>

                
                <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp;</p>
                <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; </p>
                <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp;</p>

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
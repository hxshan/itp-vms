import HireTable from "./HireTable"
import PropTypes from 'prop-types';


const HireList = ({showForm ,setShowForm}) => {

    HireList.propTypes = {
        showForm: PropTypes.bool.isRequired,
        setShowForm: PropTypes.func.isRequired,
    };

  return (
    <div className="w-full h-full flex bg-gray-200 px-[20px] py-[20px] justify-center items-center">
            <div className="w-full h-full bg-white">
                <div className="text-center pt-[10px] pb-[6px] border-b-2">
                    <h1 className="text-2xl font-semibold">Hire List</h1>
                </div>

                <div className="pt-[10px]">
                    <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none" onClick={()=>{setShowForm(!showForm)}}>
                        Add
                    </button>
                </div>


                <HireTable  />
            </div>
        </div>
    
  )
}

export default HireList
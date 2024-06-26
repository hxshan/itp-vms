import HireForm from "@/components/hires/HireForm"

import { ToastContainer, toast } from 'react-toastify';

const CreateHire = () => {
    
  return (
    <div>
        <div>
            <div className="text-center pt-[10px] pb-8 border-b-2 border-[#37A000] ">
                <h1 className="text-2xl font-semibold xl:text-4xl">Add Hire</h1>
            </div>

            <div>
                <HireForm />
            </div>
        </div>

        <ToastContainer />
    </div>
  )
}

export default CreateHire
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const AddClient = () => {

    const navigate = useNavigate();

    const [openComp,setopenComp] = useState(false);
    
    const [clientData,setclientData] = useState({
        firstName:'',
        lastName:'',
        gender:'',
        dob:'',
        phoneNumber:'',
        nicNumber:'',
        email:'',
        licenceNumber:'',
        address:'',
        Comp_status:false,
        companyName:'',
        Reg_num:'',
        TAX_num:'',
        legal_struc:'',
        companyEmail:'',
        companyPhone:'',
        companyAddress:'',
    })

    

    const handleInput = (e) =>{
        const {name,value} = e.target;

        if(name === "Comp_status"){
            const isCompanyAvailable = value === "true";
    
            if(!isCompanyAvailable){
                setclientData({
                    ...clientData,
                    Comp_status: isCompanyAvailable,
                    companyName: '',
                    Reg_num: '',
                    TAX_num: '',
                    legal_struc: '',
                    companyEmail: '',
                    companyPhone: '',
                    companyAddress: ''
                });
                setopenComp(false)
            } else {
                setopenComp(true);
                setclientData({
                    ...clientData,
                    Comp_status: isCompanyAvailable
                });
            }
        } else {
            setclientData({
                ...clientData,
                [name]: value
            });
        }
        }

    

    const handleSubmit = ()=>{
        console.log(clientData)
    }

  return (
    <div className='w-full flex flex-col justify-center items-center py-5' >


        <div className='flex items-center justify-center mb-4'>
            <p className=' text-[50px] font-bold '>ADD CLIENT</p>
        </div>
        <div className='bg-[#D9D9D9] w-[90%] h-fit rounded-lg py-8 flex justify-evenly '>

            <div>
                <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>First Name</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='firstName' onChange={handleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Last Name</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='lastName' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>Gender</label>
                <select className='w-[220px]  rounded-lg  bg-white border-none p-2' name='gender' onChange={handleInput}>
                    <option className='hidden'>please select</option>
                    <option value="Male" >Male</option>
                    <option value="Female" >Female</option>
                </select>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Date of Birth</label>
                <input type='date'className='w-[150px] h-10 rounded-lg  bg-white border-none px-2' name='dob' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>Phone number</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='phoneNumber' onChange={handleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>NIC number</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='nicNumber' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>Email</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='email' onChange={handleInput}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label>licence number</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' placeholder='optional' name='licenceNumber' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex flex-col mb-4'>
                <label>Address</label>
                <textarea className='h-[200px] w-[456px]  border-none rounded-lg mt-1' name='address' onChange={handleInput}></textarea>
            </div>

            

            <div className='flex flex-col gap-1 mb-4'>
                <label>Upload NIC</label>
                <input type='file'/>
            </div>
            </div>

            <div className='flex flex-col justify-between'>
            <div >
            <div >
            <div className='flex flex-col gap-1 mb-3'>
                <label>Company Available</label>
                <select className='w-[120px]  rounded-lg  bg-white border-none p-2' name='Comp_status' onChange={handleInput}>
                    <option className='hidden'>please select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className={`${openComp?'':' invisible'}`}>
            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1 '>
                <label>Company name</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='companyName' onChange={handleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Registration number</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='Reg_num' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>Tax number</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='TAX_num' onChange={handleInput}/>
            </div>
            <div className='flex flex-col gap-1'>
                <label>Legal structure</label>
                <select className='w-[220px]  rounded-lg  bg-white border-none p-2' name='legal_struc' onChange={handleInput}>
                    <option className='hidden' value="">please select</option>
                    <option value="Sole Proprietorship" >Sole Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Liability Company" >Limited Liability Company (LLC)</option>
                    <option value="Corporation" >Corporation</option>
                    <option value="Nonprofit Organization">Nonprofit Organization</option>
                    <option value="Professional Corporation">Professional Corporation (PC)</option>
                    <option value="Professional Limited Liability Company">Professional Limited Liability Company (PLLC)</option>
                    <option value="Benefit Corporation">Benefit Corporation (B Corp)</option>
                    <option value="Joint Venture">Joint Venture</option>
                </select>
            </div>
            </div>
            
            <div className='flex gap-4 mb-3'>
            <div className='flex flex-col gap-1'>
                <label>Company email</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='companyEmail' onChange={handleInput}/>
            </div>

            <div className='flex flex-col gap-1'>
                <label>Company phone</label>
                <input type='text' className='w-[220px]  rounded-lg  bg-white border-none p-2' name='companyPhone' onChange={handleInput}/>
            </div>
            </div>

            <div className='flex flex-col mb-4'>
                <label>Address</label>
                <textarea className='h-[200px] w-[456px]  border-none rounded-lg mt-1' name='companyAddress' onChange={handleInput}></textarea>
            </div>
            </div>
            
            </div>
            
            </div>
            <div className='flex justify-end gap-4'>
                <button className=" bg-green-600 px-5 py-2 rounded-xl w-[120px] " onClick={handleSubmit}>Add</button>
                <button className=" bg-orange-600 px-5 py-2 rounded-xl w-[120px] " onClick={()=>{navigate(`/client`)}}>Cancel</button>
            </div>
            </div>

            </div>
            </div>
  )
}

export default AddClient
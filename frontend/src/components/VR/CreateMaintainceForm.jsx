import React from 'react'

export const CreateMaintainceForm = () => {
  return (
    
    <main className='w-full  flex flex-col justify-center items-center bg-slate-200'>
        <h1 className='text-3xl font-semibold  my-9'>
            Create Maintaince Form
        </h1>
        <div className=" sm:w-3/4 bg-slate-300 p-10 flex flex-col rounded-2xl ">
            <form className='flex flex-col gap-4 md:flex-row'>
                <div className="w-full">
                    <h1 className=' text-xl font-semibold m-5 text-center'>Vehicle Type</h1> 
                        <div className="flex justify-evenly">
                            <div className="flex ">
                                <input type="checkbox"  id="vrcar" className='w-5'/>
                                <span className='font-semibold ml-2'>Car</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox"  id="vrvan" className='w-5'/>
                                <span className='font-semibold ml-2'>Van</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox"  id="vrbus" className='w-5'/>
                                <span className='font-semibold ml-2'>Bus</span>
                            </div>
                            <div className="flex ">
                                <input type="checkbox"  id="vrmover" className='w-5'/>
                                <span className='font-semibold ml-2'>Prime Mover</span>
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 mt-9'>
                            <input 
                            type="text" 
                            id='vrid'
                            placeholder='Vehicle Number' 
                            className='border p-4 rounded-lg'
                            maxLength='7'
                            required/>
                            
                            <textarea 
                            type="text" 
                            id='vrissue'
                            placeholder='Fault of the Vehicle' 
                            className='border p-4 rounded-lg'
                            required/> 
                            
                            <input 
                            type="number" 
                            id='vrcost'
                            placeholder='Estimated Cost' 
                            className='border p-4 rounded-lg'
                            required/>
                        </div>
                        <h1 
                            className=' text-center text-xl font-semibold m-5'>
                                After Completing Maintenance
                        </h1> 
                        <div className="flex flex-col gap-5 mt-9">
                            <textarea 
                                type="text" 
                                id='vraddit'
                                placeholder='Additional Info' 
                                className='border p-4 rounded-lg'
                                required/> 
                        </div>
                </div>
                <div className="mt-5 flex flex-col justify-center items-center w-full">
                    <p className='font-medium'>
                        Format Images : 
                            <span 
                            className='text-slate-600 font-normal'>
                                If Have any Report or Document
                            </span>
                    </p>
                
                <div className="flex gap-4">
                    <input 
                        type="file" 
                        id='vrdocument' 
                        accept='image/*' 
                        multiple
                        className='p-3 border border-gray-800 w-full rounded-lg'/>
                    <button 
                        className='p-3 border border-green-600 rounded-lg font-semibold text-green-600 hover:shadow-lg disabled:opacity-50'>
                            Upload
                    </button> 
                </div>
            </div>
        </form>
            <button 
            className='hover:opacity-80 mt-10 bg-slate-800 p-3 rounded-lg text-white font-bold'>
                Add To Maintaince List
            </button>
            
        </div>
    </main>
    
  )
}

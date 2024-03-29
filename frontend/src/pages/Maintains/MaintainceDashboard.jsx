import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { MaintainOrderTable } from '@/components/VR/MaintainOrderTable';

export const MaintainceDashboard = () => {

    const [allmaintains, setAllmaintains] = useState([]);
  


  useEffect(() => {
   
    axios.get('http://localhost:3000/api/vehiclemaintain/allmaintains')

      //res da responseda danna

      .then((response) => {
        setAllmaintains(response.data.data);
       
      })
      .catch((error) => {
        console.log(error);
        
      })

  }, []);
    
  return (
    <main className='bg-slate-100  flex flex-col items-center'>
        <h1 className='font-bold text-3xl'>Maintenance </h1>
        <Link to="/Vrform">
                       <button className=' m-5 border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Create New Maintain </button>
              </Link>
        <div className="w-full flex items-center">
            <MaintainOrderTable Order={allmaintains} />

        </div>
    </main>
  )
}


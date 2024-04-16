import { Link } from 'react-router-dom';
import { View } from '../../components/VR/View';
import { MaintainOrderTable } from '@/components/VR/MaintainOrderTable';


export const MaintainceDashboard = () => {




  return (
    <main className='w-full place-content-center space-y-4 mt-8 bg-cover bg-center'>
      <h1 className='font-bold text-xl'>Maintenance Dashboard</h1>
      <div className="flex flex-row justify-end gap-10">

        <Link to="/Vrform">
          <button className=' m-0 border bg-actionBlue text-zinc-50 font-bold rounded-lg px-2 py-2 flex mb-4'>Create New Maintain </button>
        </Link></div>
      <div className="flex items-center">
        <MaintainOrderTable />
      </div>
    </main>
  )
}


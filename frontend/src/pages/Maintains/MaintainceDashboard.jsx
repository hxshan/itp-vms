import { Link } from 'react-router-dom';
import { View } from '../../components/VR/View';
import { MaintainOrderTable } from '@/components/VR/MaintainOrderTable';


export const MaintainceDashboard = () => {




  return (
    <main className='  flex flex-col items-center rounded-2xl shadow-xl h-full'>
      <h1 className='font-bold text-3xl'>Maintenance Dashboard</h1>
      <div className="flex items-center flex-row gap-10">

        <Link to="/Vrform">
          <button className=' m-5 border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Create New Maintain </button>
        </Link></div>
      <div className="flex items-center">
        <MaintainOrderTable />
      </div>
    </main>
  )
}


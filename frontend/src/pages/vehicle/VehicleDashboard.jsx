import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import SummaryTable from '../../components/vehicle/SummaryTable';
import NewlyAddedTable from '../../components/vehicle/NewlyAddedTable';
import UnavailableTable from '../../components/vehicle/UnavailableTable';
import VehicleSearch from '../../components/vehicle/VehicleSearch';

const VehicleDashboard = () => {

  const navigate = useNavigate();
  const [data, error, loading, axiosFetch] = useAxios()
  const [activeComponent, setActiveComponent] = useState('');


  const categories = Object.keys(data).filter(key => key !== 'vehiclesCount' && key !== 'availableCount' && key !== 'underMaintanceCount' && key !== 'underClientCount' && key !== 'underSpecialTaskCount');
  const counts = categories.map(category => data[category])

  const getData = ()=>{
    axiosFetch({
      axiosInstance:axios,
      method:'GET',
      url:'/vehicle/'
    })
  }

  useEffect(()=>{
    getData()
  },[])

  useEffect(() => {
    if (data) {
      console.log('Backend Response:', data);
    }
  }, [data]);
  
    if(loading){
      return(
        <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black" >Loading...</p>
      )
    }
    if(error){
      return(
        <p>Unexpected Error has occured!</p>
      )
  }
  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData = {
    labels: ['Car', 'Van', 'Bus', 'Lorry', 'Truck'],
    datasets: [
      {
        label: '% of Vehicles',
        data: counts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'search':
        return <VehicleSearch />;
      case 'summary':
        return (
          <div>
            {['car', 'van', 'bus', 'lorry', 'truck'].map((category) =>
              <SummaryTable key={category} category={category} filteredData={data[category]} />
           )}
          </div>
        );
      case 'newAdded':
        return (
          <div>
          
          </div>
        );
        
      case 'unavalable':
        return <UnavailableTable />;
      default:
        return null;
    }
  };
  

  // const renderNewlyAddedTable = (category, categoryData) => {
  //   return (
  //     <div className='mt-4' key={category}>
  //       <h2 className='text-l font-bold'>{category}</h2>
  //       <table className='w-full border-collapse border-spacing-2  border-black'>
  //         <thead className=' bg-slate-500 text-white'>
  //           <tr>
  //             <th className='border border-slate-600'>Vehicle Type</th>
  //             <th className='border border-slate-600'>Vehicle Model</th>
  //             <th className='border border-slate-600'>Vehicle Register</th>
  //             <th className='border border-slate-600'>Licence End Date</th>
  //             <th className='border border-slate-600'>Insurance End Date</th>
  //           </tr>
  //         </thead>
  //         <tbody className=''>
  //           {categoryData.map((vehicle) => (
  //             <tr key={vehicle._id}>
  //               <td className='border border-slate-700'>{vehicle.vehicleType}</td>
  //               <td className='border border-slate-700'>{vehicle.vehicleModel}</td>
  //               <td className='border border-slate-700'>{vehicle.vehicleRegister}</td>
  //               <td className='border border-slate-700'>{new Date(vehicle.licEndDate).toLocaleDateString('en-US', {
  //                 year: 'numeric',
  //                 month: '2-digit',
  //                 day: '2-digit'
  //               })}</td>
  //               <td className='border border-slate-700'>{new Date(vehicle.insEndDate).toLocaleDateString('en-US', {
  //                 year: 'numeric',
  //                 month: '2-digit',
  //                 day: '2-digit'
  //               })}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };
  
  // if (!data) {
  //   return null; // Handle no data scenario

  
  //onst { vehicles, newAdded } = data;

  const { vehicles, newAdded } = data;

  const renderNewlyAddedTable = (category, categoryData) => {
    return (
      <div className='mt-4' key={category}>
        <h2 className='text-l font-bold'>{category}</h2>
        <table className='w-full border-collapse border-spacing-2 border-black'>
          <thead className='bg-slate-500 text-white'>
            <tr>
              <th className='border border-slate-600'>Vehicle Type</th>
              <th className='border border-slate-600'>Vehicle Model</th>
              <th className='border border-slate-600'>Vehicle Register</th>
              <th className='border border-slate-600'>Licence End Date</th>
              <th className='border border-slate-600'>Insurance End Date</th>
            </tr>
          </thead>
          <tbody>
            {categoryData.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className='border border-slate-700'>{vehicle.vehicleType}</td>
                <td className='border border-slate-700'>{vehicle.vehicleModel}</td>
                <td className='border border-slate-700'>{vehicle.vehicleRegister}</td>
                <td className='border border-slate-700'>{new Date(vehicle.licEndDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</td>
                <td className='border border-slate-700'>{new Date(vehicle.insEndDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return  (
    
    <div className="place-content-center space-y-4 mt-8 bg-cover bg-center bg-white ">
      <h1 className="text-lg font-bold">Vehicle Management Dashboard</h1>
      <div className='mt-5 mb-5 flex flex-row items-center justify-start '> 
        <div className='w-full p-4 bg-slate-200 rounded-md pad mr-2'>
          <h1 className="text-base font-bold">Stored vehicle details</h1>
          
          <div className="flex m-2 flex-row justify-satart  bg-slate-200 rounded-md pad">
            <div className='space-y-4 mr-5'>
             <div className="grow p-3 bg-black rounded-md pad">
             <Pie data={chartData} /> 
             </div>

             <div className='text-black text-xs font-bold'>Vehicle count summary</div>

             <div className='flex flex-row'>
             <div className=" mr-2 p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Total<h1 className='text-yellow-500 text-xl'>{data.vehiclesCount}</h1> </div>
             </div>
             <div className=" mr-2 p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Car<h1 className='text-white-500 text-xl'>{data.carCount}</h1> </div>
             </div>
             <div className=" mr-2 p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Van<h1 className='text-white-500 text-xl'> {data.vanCount}</h1></div>
             </div>
             <div className=" mr-2 p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Bus<h1 className='text-white-500 text-xl'>{data.busCount}</h1></div>
             </div>
             <div className=" mr-2 p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Lorry<h1 className='text-white-500 text-xl'>{data.lorryCount}</h1></div>
             </div>
             <div className=" mr p-3 bg-black rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Truck<h1 className='text-white-500 text-xl'>{data.truckCount}</h1></div>
             </div>
             </div>
            </div>

             <div className=" space-y-2 p-3 pl-10 bg-white rounded-md pad">  
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Available Vehicle <h1 className='text-lime-600 text-xl'>{data.availableCount}</h1> </div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Maintance Vehicle<h1 className='text-red-500 text-lg'>{data.underMaintanceCount}</h1></div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Client Vehicle<h1 className='text-black text-lg'> {data.underClientCount}</h1> </div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Special Task Vehicle<h1 className='text-black text-lg'>{data.underSpecialTaskCount}</h1></div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Special Task Vehicle<h1 className='text-black text-lg'>{data.underInactiveCount}</h1></div>
             </div>   

            <div className='w-full ml-5 flex flex-col justify-start  bg-white rounded-md pad'>
             <div className='m-4 flex flex-row'>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => navigate('add')}>Add vehicle</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-lime-500 ease-in-out duration-300" onClick={() => setActiveComponent('search')}>Search vehicle</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-red-500 ease-in-out duration-300" onClick={() => navigate()}>Report Generate</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('summary')}>Vehicle Summary</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('newAdded')}>Newly added</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-s font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('unavalable')}>Unavailable vehicles</button>
             </div>

            </div>
          </div>
        </div>
        <div>

        
      </div>
      </div>
      
      
      <div className='p-4 bg-slate-200 rounded-md pad'>
       <div>
        {renderComponent()}
       </div>

       <div>
        {renderNewlyAddedTable('Newly Added', newAdded)}
       </div>
        
      </div>

    </div>
    
  );

  
};

export default VehicleDashboard
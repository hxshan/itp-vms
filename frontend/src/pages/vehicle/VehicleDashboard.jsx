import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import NewlyAddedTable from '../../components/vehicle/NewlyAddedTable';
import UnavailableTable from '../../components/vehicle/UnavailableTable';
import VehicleSearch from "../../components/vehicle/VehicleSearch"
import SummaryTable from "../../components/vehicle/SummaryTable"
import DeletedTable from "../../components/vehicle/DeletedVehicle"

const VehicleDashboard = () => {

  const navigate = useNavigate();
  const [data, error, loading, axiosFetch] = useAxios()
  const [activeComponent, setActiveComponent] = useState('search');
  const { newAdded } = data;
  

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
        return (
          <div>
            <VehicleSearch />
          </div>
        );
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
            <NewlyAddedTable category='Newly Added' categoryData={newAdded} />
          </div>
        );
        
      case 'unavalable':
        return <UnavailableTable />;
      default:
        return null;
      
      case 'deleted':
        return (
          <div>
            <DeletedTable />
          </div>
        );
    }
  };


  if (!data || !data.newAdded) {
    return <p className='mt-3 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad'>No data available or Server is offline.</p>;
  }
  

  const calculatePercentage = (numerator, denominator) => {
    const res = (numerator / denominator) * 100;

    if(isNaN(res)){
          return 0;
    }

    else{
      return res
    }
  }

  const carPercentage = calculatePercentage(data.carCount, data.vehiclesCount);
  const busPercentage = calculatePercentage(data.busCount, data.vehiclesCount);
  const lorryPercentage = calculatePercentage(data.lorryCount, data.vehiclesCount);
  const truckPercentage = calculatePercentage(data.truckCount, data.vehiclesCount);
  const vanPercentage = calculatePercentage(data.vanCount, data.vehiclesCount);


  return  (
    
    <div className="w-full place-content-center space-y-4 mt-8 bg-cover bg-center bg-white ">
      <h1 className="text-lg font-bold">Vehicle Management Dashboard</h1>
      <div className='place-content-center'> 
        <div className='shadow-xl flex flex-col  p-5'>
          <h1 className="text-base font-bold">Stored vehicle details</h1>
          
          <div className="flex m-2 flex-col ">
            <div className='flex flex-row '>
             <div className="grow-0 p-3 bg-white rounded-md pad justify-satart">
             <Pie data={chartData} /> 
             </div>
             
             <div className='grow flex flex-col'>
             <div className='text-black text-xs font-bold mb-2'>Vehicle count summary</div>

             <div className='flex flex-col space-y-2'>
             <div className=" m-0 p-2  bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
               <div className="text-xs text-white font-semibold rounded-md pad">Totol vehicle count added in the system<h1 className='text-yellow-500 text-xl'>{data.vehiclesCount}</h1> </div>
             </div>
             <div className=" m-0 p-2 bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
              <div className='flex flex-reo justify-between '>
               <div className="text-xs text-white font-semibold rounded-md pad">Totol car count added in the system<h1 className='text-white-500 text-xl'>{data.carCount}</h1></div>
                    <div className='ml-2 text-2xl place-content-center text-yellow-400 font-bold'>{carPercentage.toFixed(2)}% </div> 
              </div>
             </div>
             <div className=" m-0 p-2 bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
             <div className='flex flex-reo justify-between'>
               <div className="text-xs text-white font-semibold rounded-md pad">Totol van count added in the system<h1 className='text-white-500 text-xl'> {data.vanCount}</h1></div>
               <div className='ml-2 text-2xl place-content-center text-yellow-400 font-bold'>{vanPercentage.toFixed(2)}% </div> 
              </div> 
             </div>
             <div className=" m-0 p-2 bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
              <div className='flex flex-reo justify-between'>
               <div className="text-xs text-white font-semibold rounded-md pad">Totol bus count added in the system<h1 className='text-white-500 text-xl'>{data.busCount}</h1></div>
               <div className='ml-2 text-2xl place-content-center text-yellow-400 font-bold'>{busPercentage.toFixed(2)}% </div> 
              </div> 
             </div>
             <div className=" m-0 p-2 bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
             <div className='flex flex-reo justify-between '>
               <div className="text-xs text-white font-semibold rounded-md pad">Totol lorry count added in the system<h1 className='text-white-500 text-xl'>{data.lorryCount}</h1></div>
               <div className='ml-2 text-2xl place-content-center text-yellow-400 font-bold'>{lorryPercentage.toFixed(2)}% </div> 
              </div> 
             </div>
             <div className=" m-0 p-2  bg-gradient-to-r from-green-700 to-green-400 rounded-md pad">
             <div className='flex flex-reo justify-between'>
               <div className="text-xs text-white font-semibold rounded-md pad">Totol truck count added in the system<h1 className='text-white-500 text-xl'>{data.truckCount}</h1></div>
               <div className='ml-2 text-2xl place-content-center text-yellow-400 font-bold'>{truckPercentage.toFixed(2)}% </div> 
              </div> 
             </div>
             </div>
             </div>
            

             <div className="space-y-2 p-3 pl-10 bg-white rounded-md pad">  
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Available Vehicle <h1 className='text-lime-600 text-xl'>{data.availableCount}</h1> </div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Maintance Vehicle<h1 className='text-red-500 text-lg'>{data.underMaintanceCount}</h1></div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Client Vehicle<h1 className='text-black text-lg'> {data.underClientCount}</h1> </div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Special Task Vehicle<h1 className='text-black text-lg'>{data.underSpecialTaskCount}</h1></div>
               <div className="text-sm p-2 bg-slate-200 text-black font-semibold rounded-md pad">Under Inactive Vehicle<h1 className='text-black text-lg'>{data.underInactiveCount}</h1></div>
             </div> 
            </div>

            
             <div className='mt-8 flex flex-row'>
             <button className= "m-1 px-2 py-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => navigate('add')}>Add vehicle</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('search')}>Search vehicle</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-red-500 ease-in-out duration-300" onClick={() => navigate()}>Report Generate</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('summary')}>Vehicle Summary</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('newAdded')}>Newly added</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('unavalable')}>Unavailable vehicles</button>
             <button className= "m-1 p-2 bg-blue-500 text-zinc-50 rounded-md text-sm font-semibold  hover:bg-slate-500 ease-in-out duration-300" onClick={() => setActiveComponent('deleted')}>Inactive vehicle</button>
             </div>

            
          </div>
        </div>
        <div>

        
      </div>
      </div>
      
      <div>
        {renderComponent()}
        
      </div>
   </div>   
 )
};

export default VehicleDashboard
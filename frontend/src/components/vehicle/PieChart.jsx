import React,{useState,useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import SummaryTable from "../../components/vehicle/SummaryTable"
import { useNavigate } from 'react-router-dom';
import { ReactToPrint } from 'react-to-print';

const PieChart = () => {
 
const [data, error, loading, axiosFetch] = useAxios()
const categories = Object.keys(data).filter(key => key !== 'vehiclesCount' && key !== 'availableCount' && key !== 'underMaintanceCount' && key !== 'underClientCount' && key !== 'underSpecialTaskCount');
const counts = categories.map(category => data[category])
const [activeComponent, setActiveComponent] = useState('summary');
const navigate = useNavigate();
const componentRef = React.createRef();

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


  if(loading){
    return(
      <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black" >Loading...</p>
    )
  }
  if(error){
    return(
      <p className="flex flex-col items-center justify-center h-screen text-center text-lg font-bold text-black">Unexpected Error has occured!</p>
    )
} 

if (!data || !data.newAdded) {
    return <p className='mt-3 p-3 font-medium text-sm text-white bg-red-500 rounded-md pad'>No data available or Server is offline.</p>;
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

  const renderComponent = () => {
    switch (activeComponent) {
        case 'summary':
        return (
          <div>
            {['car', 'van', 'bus', 'lorry', 'truck'].map((category) =>
              <SummaryTable key={category} category={category} filteredData={data[category]} />
           )}
          </div>
        );
    }
  }

  return (
    <div className=' flex flex-col  p-5'>
        <div className='flex flex-row justify-end'>
            <div>
            <ReactToPrint
                    trigger={() => (
                        <button
                            className="mx-2 px-3 py-1 rounded-md bg-red-500 text-white text-sm text-bold"
                        >
                            General Report
                        </button>
                    )}
                    content={() => componentRef.current}
                />
           
    
            </div>    


            <button className='mx-2 px-3 py-1 rounded-md bg-blue-500 text-white text-sm text-bold' onClick={() => navigate('/vehicle')}>Dashboard</button>     
        </div>
        <div ref={componentRef}>
          <div className='p-4'> 
          <h1 className="text-base font-bold mb-3">Stored vehicle details</h1>
          
          <div className="flex m-0 flex-col ">

           
            <div className='flex flex-row '>
               
                <div className="grow-0 p-3 bg-white rounded-md pad justify-satart">

                  <Pie data={chartData} /> 
                
                </div>
            
             
             <div className='ml-6 grow flex flex-col space-y-2'>

             <div className='text-black text-sm font-bold mb-2'>Vehicle count summary</div> 

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

             
        </div> 

        <div>
          {renderComponent()}
        </div>
        </div>
        </div> 
        
    </div>        
   );          
}

export default PieChart
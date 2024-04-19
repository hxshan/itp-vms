import  { useEffect, useState} from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";


const AlertTable = () => {
    const [caseFiles, setCaseFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    // Fetch Driver Alerts

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/api/caseFiles/driverAlerts')
            .then((response) => {
                setCaseFiles(response.data);
                setLoading(false);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error fetching case files", error);
                setLoading(false);
            });
    }, []);

    const handleEdit = () => {
        navigate('/emergency/create');
    };

    return(
        <div className="container mx-auto">
        {loading ? (
            <Spinner />
        ):(

            <div className="mt- 10" >
                <table className="min-w-full divide-y divide-gray-200" >
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Of Incident</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger Count</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th> 
                                
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {caseFiles.map((caseFile) => (
                        <tr key={caseFile._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.caseTitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.timeOfIncident.split('T')[0]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.passengerCount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-md ${caseFile.severity === 'minor' ? 'text-yellow-700 bg-yellow-100' : caseFile.severity === 'moderate' ? 'text-orange-700 bg-orange-100' :caseFile.severity === 'severe' ? 'text-red-700 bg-red-100': 'text-orange-600 bg-orange-100'}`}>
                                        {caseFile.severity.toUpperCase()}
                                        </span>
                                </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div  className= {caseFile.status == 'completed' ? `w-full text-white bg-red-500 rounded-md py-1 px-5 `: `w-full text-white bg-green-500 rounded-md py-1 px-4 `}>
                                            {caseFile.status}
                                    </div>
                                </td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile?.hire?.cusName}</td>
                            
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}





    </div>
    )



    };

    export default AlertTable;


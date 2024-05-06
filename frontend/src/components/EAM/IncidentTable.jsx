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
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire ID</th> 
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {caseFiles.map((caseFile) => (
                        <tr key={caseFile._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.caseTitle}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.timeOfIncident}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.passengerCount}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.severity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{caseFile.hireId}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={handleEdit} className="px-4 py-2 bg-[#D4D800] text-white rounded-md mr-2">Edit</button>
                            </td>
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


import  { useEffect, useState} from "react";
import  axios  from "@/api/axios";
import Spinner from "@/components/EAM/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox , MdOutlineDelete} from "react-icons/md";

const Home = () => {
    const [caseFiles, setCaseFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch case files
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/api/caseFiles')
            .then((response) => {
                setCaseFiles(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching case files", error);
                setLoading(false);
            });

        }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mt-5">
                <h1 className="text-3xl">Case Files</h1>
                <Link to="/emergency/create" className="btn btn-primary">
                    <MdOutlineAddBox className="inline-block mr-2" /> Create Case File
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="mt-5">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {caseFiles.map((caseFile) => (
                                <tr key={caseFile._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.caseTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.caseDesc}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{caseFile.casePriority}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/caseFiles/edit/${caseFile._id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            <AiOutlineEdit className="inline-block" />
                                        </Link>
                                        <Link to={`/caseFiles/details/${caseFile._id}`} className="text-indigo-600 hover:text-indigo-900 mr-2">
                                            <BsInfoCircle className="inline-block" />
                                        </Link>
                                        <Link to={`/caseFiles/delete/${caseFile._id}`} className="text-red-600 hover:text-red-900">
                                            <MdOutlineDelete className="inline-block" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}

export default Home;
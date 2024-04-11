import {useState, useEffect} from "react";
import viewCaseFile from "./viewCaseFile";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";

import { useNavigate } from "react-router-dom";
import { url } from "inspector";

const CaseFileTable = () => {
    const [caseFiles, setCaseFiles] = useState([]);
    const [caseFileData , error, loading, axiosFetch] = useAxios();
    const [reload, setReload] = useState(0);

    

    useEffect(() => {
         
        const fetchCaseFiles = async () => {

            axiosFetch({
                axiosInstance: axios,
                method: "GET",
                url: "/casefile",
            });
        };
        //fetch data from backend

       /* axios.get('/api/casefile')
        .then(Response => {
            setCaseFiles(Response.data)
        })

        .catch(error =>{
            console.error('Error fetching data:', error);
        }); */

        fetchCaseFiles();
        
    }, []);

    const[viewCaseFile, setViewCaseFile] = useState(false);
    const[viewCaseFileData, setViewCaseFileData] = useState(null);
    

 
/*
    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this case file?")){
            axios.delete(`/api/casefile/${id}`)
            .then(Response => {
                setCaseFiles(caseFiles.filter((caseFile) => caseFile._id !== id));
                console.log('Case file deleted successfully:', Response.data);
            })
            .catch(error => {
                console.error('Error deleting case file:', error);
            });
        }
    };
*/

    const deleteCaseFile = async(id) => {
        if(window.confirm("Are you sure you want to delete this case file?")){
            await axiosFetch({
                axiosInstance: axios,
                method: "DELETE",
                url: `/casefile/${id}`,
            });
            if(!error){
                setReload(reload + 1);
            }
    }
};

    const handleView = (id) => {
       const selected = caseFiles.find((caseFile) => caseFile._id === id);
         setViewCaseFileData(selected);
         setViewCaseFile(true);
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    
    return (
        <div className="w-full h-full flex px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">
            <table className='w-full text-center'>
                <thead className="border-b-2 border-black">
                    <tr>
                        <th className='px-4 py-2'>Title</th>
                        <th className='px-4 py-2'>Description</th>
                        <th className='px-4 py-2'>Priority</th>
                        <th className='px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {caseFiles != null && caseFiles.length > 0 ?
                        (caseFiles.map((caseFile ,index) => (
                            <tr key={caseFile._id} className='h-8 '>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index+1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseFile.caseTitle}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseFile.caseDesc}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseFile.casePriority}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className="flex justify-center gap-x-4">
                                        <button onClick={() => handleView(caseFile._id)} className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>View </button>
                                        
                                        <button onClick={() => deleteCaseFile(caseFile._id)} className='border bg-red-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Delete </button>
                                    </div>
                                </td>
                            </tr>
                        ))): (
                            <tr>
                                <td colSpan="4" className='text-center'>
                                    No Case Files available
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>

            {viewCaseFile && <viewCaseFile setViewCaseFile={setViewCaseFile} viewCaseFileData={viewCaseFileData} />}
        </div>

    );
};
    
export default CaseFileTable;

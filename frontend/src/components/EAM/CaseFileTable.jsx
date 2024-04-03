import React, {useState, useEffect} from "react";
import axios from "@/api/axios";
import { useHistory } from "react-router-dom";
import { error } from "console";

const CaseFileTable = () => {
    const [caseFiles, setCaseFiles] = useState([]);

    const history = useHistory();

    useEffect(() => {
        //fetch data from backend

        axios.get('/api/casefile')
        .then(Response => {
            setCaseFiles(Response.data)
        })

        .catch(error =>{
            console.error('Error fetching data:', error);
        });
        
    }, []);

    const handleEdit = (id) => {

        history.push('/');//redirect to edit page need to create edit page first 
        console.log('Edit:', id);
    };

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

    const handleView = (id) => {
        history.push();//redirect to view page need to create view page first
        console.log('View:', id);
    };
    
    return (
        <div className="w-full flex items-center">
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-700 rounded-md'>No</th>
                        <th className='border border-slate-700 rounded-md'>Case Name</th>
                        <th className='border border-slate-700 rounded-md'>Case Type</th>
                        <th className='border border-slate-700 rounded-md'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {caseFiles && caseFiles.length > 0 ?
                        (caseFiles.map((caseFile ,index) => (
                            <tr key={caseFile._id} className='h-8 '>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index+1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseFile.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {caseFile.type}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className="flex justify-center gap-x-4">
                                        <button onClick={() => handleView(caseFile._id)} className='border bg-blue-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>View </button>
                                        <button onClick={() => handleEdit(caseFile._id)} className='border bg-green-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Edit </button>
                                        <button onClick={() => handleDelete(caseFile._id)} className='border bg-red-500 text-zinc-50 rounded-lg pr-3 pl-3 p-2'>Delete </button>
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
        </div>

    );
};
    
export default CaseFileTable;

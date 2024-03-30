import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

const RolesTable = () => {
  const navigate = useNavigate();
  //const [roles,setroles]=useState([])
  const [search, setSearch] = useState("");
  const [roles, error, loading, axiosFetch] = useAxios();
  const [reload, setReload] = useState(0);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/role/",
    });
  };

  const deleteData =async(e) => {
    e.preventDefault()
    console.log(e.target.id)
    await axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/role/${e.target.id}`,
    });

    if(!error){
      setReload(reload + 1);
    } 
  };

  useEffect(() => {
    getData();
  }, [reload]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <h2 className="font-bold text-xl underline mb-4">Role List</h2>
        <div className="flex gap-4 w-fit">
          <button className="w-[130px] bg-blue-600 p-1 px-1 rounded-lg shadow-md text-sm text-white font-bold">
            Add Role
          </button>

          <input
            type="text"
            name="Search"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-500">
            <tr>
              <th className="relative px-6 py-3">
                <span className="text-center text-xs font-bold text-white uppercase tracking-wider">
                  Role
                </span>
              </th>
              <th className="relative px-6 py-3">
                <span className="text-center text-xs font-bold text-white uppercase tracking-wider">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {roles != null && roles.length > 0 ? (
              roles
                .filter((role) => {
                  return search.toLowerCase === ""
                    ? role
                    : role.name.toLowerCase().includes(search);
                })
                .map((row) => {
                  return (
                    <tr
                      className="bg-white border-t border-gray-200"
                      key={row._id}
                    >
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                        {row.name}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap justify-between flex">
                        <button
                          className="bg-yellow-300 text-white py-1 px-6 rounded-md"
                          id={row._id}
                          onClick={(e) => {
                            navigate(e.target.id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-700 text-white py-1 px-6 rounded-md"
                          id={row._id}
                          onClick={(e)=>{deleteData(e)}}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={roles.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;

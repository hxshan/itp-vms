import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";

const CreateRoleForm = () => {
  const [response, error, loading, axiosFetch] = useAxios()
  const { user } = useAuthContext()
  const [roleData, setRoleData] = useState({
    name: "",
    userPermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    vehiclePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    vehicleMaintenencePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    hirePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    contractPermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    emergencyPermissions:{
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    financePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    isDriver:false
  });

  const handlePermissionChange = (permission, type, checked) => {
    const updatedRoleData = { ...roleData };

    switch (permission) {
      case "user":
        updatedRoleData.userPermissions[type] = checked;
        break;
      case "vehicle":
        updatedRoleData.vehiclePermissions[type] = checked;
        break;
      case "vehicleMaintenence":
        updatedRoleData.vehicleMaintenencePermissions[type] = checked;
        break;
      case "hire":
        updatedRoleData.hirePermissions[type] = checked;
        break;
      case "contract":
        updatedRoleData.contractPermissions[type] = checked;
        break;
      case "emergency":
        updatedRoleData.emergencyPermissions[type] = checked;
        break;
      case "finance":
        updatedRoleData.financePermissions[type] = checked;
        break;
    }
    setRoleData(updatedRoleData)
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
        await axiosFetch({
          axiosInstance:axios,
          method:'POST',
          url:'/role/',
          requestConfig:{
            data:{
              ...roleData
            }
          },
          headers:{
            authorization:`Bearer ${user?.accessToken}`
          }
        })
       
  };

  if(loading){
    return(<h1>
      Loading...
    </h1>)
  }
  /*  for seeding data
   <div>
            <h1 className="text-balance font-bold">Predefined permissions</h1>
            <div className="w-fit p-1 flex flex-row items-center gap-2 h-8">
              <label htmlFor="isDriver" 
              className="px-6 font-semibold">
                Driver
                </label>
              <input
                      type="checkbox"
                      name="isDriver"
                      checked={roleData.isDriver}
                      onChange={(e) => {
                        handlePermissionChange(
                          "driver",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
            </div>
          </div>
  */

  return (
    <div >
      <h1 className="text-2xl font-bold underline mt-4 mb-8">Create Role</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="col-span-1 w-full flex flex-col mb-4 ">
            <label
              className="block text-gray-700 text-md font-bold mb-2"
              htmlFor="name"
            >
              Role Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={roleData.name}
              onChange={(e)=>{
                return(
                  setRoleData({
                    ...roleData,
                    name:e.target.value
                  })
                )
              }}
              placeholder="Role name"
            />
            {
              error && <p className="text-red-500">{error}</p>
            }
          </div>
        </div>

          <div className='w-full mt-8 rounded-lg'>
            <table className="min-w-full divide-y divide-gray-200 border-x border-b border-gray-200">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-white text-center uppercase tracking-wider border-r border-white">Permissions</th>
                  <th className="px-6 py-3 text-xs font-bold text-white text-center uppercase tracking-wider border-r border-white">Can Create</th>
                  <th className="px-6 py-3 text-xs font-bold text-white text-center uppercase tracking-wider border-r border-white">Can Read</th>
                  <th className="px-6 py-3 text-xs font-bold text-white text-center uppercase tracking-wider border-r border-white">Can Update</th>
                  <th className="px-6 py-3 text-xs font-bold text-white text-center uppercase tracking-wider">Can Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>User Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.userPermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "user",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.userPermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "user",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.userPermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "user",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.userPermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "user",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>vehiclePermissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.vehiclePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicle",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.vehiclePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicle",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.vehiclePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicle",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.vehiclePermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicle",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>vehicle Maintenence Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.vehicleMaintenencePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicleMaintenence",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.vehicleMaintenencePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicleMaintenence",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.vehicleMaintenencePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicleMaintenence",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.vehicleMaintenencePermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "vehicleMaintenence",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>Hire Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.hirePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.hirePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.hirePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.hirePermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>Contract Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.contractPermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.contractPermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      value={roleData.contractPermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      name="Delete"
                      value={roleData.contractPermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>Emergency Managment Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      value={roleData.emergencyPermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      value={roleData.emergencyPermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      value={roleData.emergencyPermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      name="Delete"
                      value={roleData.emergencyPermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
                
                <tr className="bg-white border-t border-gray-200">
                  <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200 font-semibold">
                    <span>Finance Permissions</span>
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Create"
                      value={roleData.financePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Read"
                      value={roleData.financePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center border-r border-gray-200">
                    <input
                      type="checkbox"
                      name="Update"
                      value={roleData.financePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <input 
                      type="checkbox"
                      name="Delete"
                      checked={roleData.financePermissions.Delete}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <button
          type="submit"
          className="bg-green-600 py-2 px-6 rounded-md my-8 text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRoleForm;

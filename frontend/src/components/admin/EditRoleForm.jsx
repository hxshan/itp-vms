import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import {useNavigate , useParams } from "react-router-dom";


const EditRoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, error, loading, axiosFetch] = useAxios()

  const [roleData, setRoleData] = useState({
    _id: "",
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
    HirePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    ContractPermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    EmergencyPermissions:{
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
    FinancePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
  });

  const getData =()=>{
     axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: `/role/${id}`,
    });
  }
  useEffect(()=>{
    console.log(data)
    if(error){
      alert(error)
      navigate('/admin')
    }
    if(data && Object.keys(data).length !== 0){
      setRoleData(data)
    }
  },[data])

  useEffect(()=>{
    getData()
  },[])

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
        updatedRoleData.HirePermissions[type] = checked;
        break;
      case "contract":
        updatedRoleData.ContractPermissions[type] = checked;
        break;
      case "emergency":
        updatedRoleData.EmergencyPermissions[type] = checked;
        break;
      case "finance":
        updatedRoleData.FinancePermissions[type] = checked;
        break;
    }
    setRoleData(updatedRoleData);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    await axiosFetch({
      axiosInstance:axios,
      method:'PUT',
      url:`/role/${id}`,
      requestConfig:{
        data:{
          ...roleData
        }
      }
    })
    if(error){
      alert(error)
    }
    if(data){
      alert("successfully updated")
      navigate('/admin/roles')
    }
  };

  if(loading){
    return(
      <h1>Loading ...</h1>
    )
  }

  return (
    <div>
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
              onChange={(e) => {
                return setRoleData({
                  ...roleData,
                  name: e.target.value,
                });
              }}
              placeholder="Role name"
            />
          </div>
        </div>

        <div>
          <h1>Permissions</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Can Create</th>
                  <th>Can Read</th>
                  <th>Can Update</th>
                  <th>Can Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>User Permissions</span>
                  </td>
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
                    <input
                      type="checkbox"
                      name="Delete"
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
                </tr>
                <tr>
                  <td>
                    <span>vehiclePermissions</span>
                  </td>
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                <tr>
                  <td>
                    <span>vehicle Maintenence Permissions</span>
                  </td>
                  <td>
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
                  <td>
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
                  <td>
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
                  <td>
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
                <tr>
                  <td>
                    <span>Hire Permissions</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.HirePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.HirePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.HirePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "hire",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.HirePermissions.Delete}
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
                <tr>
                  <td>
                    <span>Contract Permissions</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.ContractPermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.ContractPermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.ContractPermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "contract",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.ContractPermissions.Delete}
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

                <tr>
                  <td>
                    <span>Emergency Managment Permissions</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Create"
                      value={roleData.EmergencyPermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Read"
                      value={roleData.EmergencyPermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Update"
                      value={roleData.EmergencyPermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "emergency",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input 
                      type="checkbox"
                      name="Delete"
                      value={roleData.EmergencyPermissions.Delete}
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
                

                <tr>
                  <td>
                    <span>Finance Permissions</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Create"
                      checked={roleData.FinancePermissions.Create}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Read"
                      checked={roleData.FinancePermissions.Read}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Update"
                      checked={roleData.FinancePermissions.Update}
                      onChange={(e) => {
                        handlePermissionChange(
                          "finance",
                          e.target.name,
                          e.target.checked
                        );
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Delete"
                      checked={roleData.FinancePermissions.Delete}
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
        </div>
        <button
          type="submit"
          className="bg-green-600 py-2 px-6 rounded-md text-white font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditRoleForm;

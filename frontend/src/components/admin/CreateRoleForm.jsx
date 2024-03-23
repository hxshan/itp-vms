import useAxiosPost from "@/hooks/useAxiosPost";
import { useState } from "react";

const CreateRoleForm = () => {
   
  const { response, error, isLoading, postData } = useAxiosPost();

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
    FinancePermissions: {
      Create: false,
      Read: false,
      Update: false,
      Delete: false,
    },
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
        updatedRoleData.HirePermissions[type] = checked;
        break;
      case "contract":
        updatedRoleData.ContractPermissions[type] = checked;
        break;
      case "finance":
        updatedRoleData.FinancePermissions[type] = checked;
        break;
    }
    setRoleData(updatedRoleData)
  };

  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      const responseData = await postData("/user/addrole", roleData); 
      if(responseData)
        alert("Role added Succesfully")
      
    } catch (error) {
        console.error("Error:", error);
        alert(error) 
    }
  };

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
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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
                    <span>Finance Permissions</span>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="Create"
                      value={roleData.userPermissions.Create}
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
                      value={roleData.userPermissions.Read}
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
                      value={roleData.userPermissions.Update}
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
                      value={roleData.userPermissions.Delete}
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

export default CreateRoleForm;

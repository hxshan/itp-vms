import { useEffect, useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";
import { useAuthContext } from "@/hooks/useAuthContext";
import { jwtDecode } from "jwt-decode";

const RolesTable = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [decodedToken, setDecodedToken] = useState("");
  //const [roles,setroles]=useState([])
  const [search, setSearch] = useState("");
  const [roles, error, loading, axiosFetch] = useAxios();
  const [reload, setReload] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(6);

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/role/",
      headers: {
        withCredentials: true,
        authorization: `Bearer ${user?.accessToken}`,
      },
    });
  };

  const deleteData = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to Delete the following")) {
      await axiosFetch({
        axiosInstance: axios,
        method: "DELETE",
        url: `/role/${e.target.id}`,
        headers: {
          withCredentials: true,
          authorization: `Bearer ${user?.accessToken}`,
        },
      });
      if (!error) {
        setReload(reload + 1);
      }
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      setDecodedToken(jwtDecode(user?.accessToken));
      getData();
    }
  }, [reload]);

  if (loading) {
    return (
      <div className="w-full flex justify-center h-[300px] bg-white">
        <ClockLoader color="#36d7b7" height={50} width={10} />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full flex justify-between mb-4">
        <h2 className="font-bold text-xl underline mb-4">Role List</h2>
        <div className="flex gap-4 w-fit">
          {/* <button className="w-[130px] bg-actionBlue p-1 px-1 rounded-lg shadow-md text-sm text-white font-bold">
            Add Role
          </button> */}
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

      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-secondary">
            <tr>
              <th className="relative px-6 py-3 border-r border-white">
                <span className="text-center text-xs font-bold text-white uppercase tracking-wider">
                  Role
                </span>
              </th>
              {user?.permissions?.userPermissions.Create ===true &&
              <th className="relative px-6 py-3">
                <span className="text-center text-xs font-bold text-white uppercase tracking-wider">
                  Action
                </span>
              </th>
              }
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
                .slice(startIdx, endIdx)
                .map((row) => {
                  return (
                    <tr
                      className="bg-white border-t border-gray-200"
                      key={row._id}
                    >
                      <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                        {row.name}
                      </td>
                      {user?.permissions?.userPermissions.Create ===true && row?.isSystemRole ? (
                        <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                          <p>System Role cannot be changed</p>
                        </td>
                      ) : (
                        <>
                        {user?.permissions?.userPermissions.Create ===true &&
                          <td className="px-6 py-2 whitespace-nowrap justify-evenly flex">
                            <button
                              className="bg-actionBlue text-white py-1 px-6 rounded-md"
                              id={row._id}
                              onClick={(e) => {
                                navigate(e.target.id);
                              }}
                            >
                              View
                            </button>
                            {decodedToken?.UserInfo?.role?.userPermissions[
                              "Update"
                            ] && (
                              <button
                                className="bg-actionGreen text-white py-1 px-6 rounded-md"
                                id={row._id}
                                onClick={(e) => {
                                  navigate(e.target.id);
                                }}
                              >
                                Edit
                              </button>
                            )}

                            {decodedToken?.UserInfo?.role?.userPermissions[
                              "Delete"
                            ] && (
                              <button
                                className="bg-actionRed text-white py-1 px-6 rounded-md"
                                id={row._id}
                                onClick={(e) => {
                                  deleteData(e);
                                }}
                              >
                                Delete
                              </button>
                            )}

                          </td>
                        }
                        </>
                      )}
                    </tr>
                  );
                })
            ) : (
              <tr className="bg-white border-t border-gray-200">
                <td colSpan={roles.length}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end">
        <button
          className={`${
            startIdx == 0 ? "hidden" : ""
          } py-1 px-2 border border-gray-600 rounded-md mt-4`}
          onClick={() => {
            setStartIdx(startIdx - 6);
            setEndIdx(endIdx - 6);
          }}
          type="button"
        >
          Previous
        </button>
        <button
          className={`${
            roles.length - endIdx <= 0 ? "hidden" : " "
          } ml-8 py-1 px-2 border border-gray-600 rounded-md mt-4`}
          onClick={() => {
            setStartIdx(startIdx + 6);
            setEndIdx(endIdx + 6);
          }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RolesTable;

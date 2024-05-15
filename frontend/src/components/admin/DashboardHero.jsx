import axios from "@/api/axios";
import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import placeholder from "../../assets/placeholder.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHero = () => {
  const [users, error, loading, axiosFetch] = useAxios();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user } = useAuthContext();

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/user/userdashboard",
      headers: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    });
  };

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
    navigate(`/admin/userreport/${id}`);
  };

  useEffect(() => {
    console.log(users);
    if (users?.empPhoto) {
      setImage(users.empPhoto);
    }
  }, [users]);
  useEffect(() => {
    getData();
  }, []);

  const chartData = {
    labels: ["Active", "Inactive", "Suspended"],
    datasets: [
      {
        label: "No of Users",
        data: [users?.active, users?.inactive, users?.suspended],
        backgroundColor: [
          "rgba(116, 248, 53, 0.8)",
          "rgba(255, 46, 46, 0.8)",
          "rgba(255, 138, 43, 0.8)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(82, 255, 0, 0.8)",
          "rgba(255, 0, 0, 0.8)",
          "rgba(255, 115, 0, 0.8)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const columns = [
    "Email",
    "Endpoint",
    "Action",
    "Action Type",
    "Date",
    "Time",
    "Status",
  ];

  return (
    <>
      <div className="w-[95%] h-fit overflow-auto bg-white dark:bg-slate-800 p-8 rounded-md flex shadow-lg flex-col gap-16 mr-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <div>
            <h2 className="font-bold text-center text-xl underline">
              Stores user details
            </h2>
            <div className="mt-8 w-[280px] h-[280px] lg:w-[400px] lg:h-[400px]">
              <Pie data={chartData} />
            </div>
          </div>
          <div className="h-fit w-full flex flex-col gap-4">
            <div className="w-full mt-10 py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
              <p className="text-white text-xl font-semibold">
                Active Users :{" "}
                <span className="text-white font-bold ml-4 text-2xl">
                  {users?.active?.toString().padStart(5, "0")}
                </span>
              </p>
            </div>
            <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
              <p className="text-white text-xl font-semibold">
                Inactive Users :{" "}
                <span className="text-white font-bold ml-4 text-2xl">
                  {users?.inactive?.toString().padStart(5, "0")}
                </span>
              </p>
            </div>
            <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
              <p className="text-white text-xl font-semibold">
                Supsended Users :{" "}
                <span className="text-white font-bold ml-4 text-2xl">
                  {users?.suspended?.toString().padStart(5, "0")}
                </span>
              </p>
            </div>
            <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
              <p className="text-white text-xl font-semibold">
                Total No of Users :{" "}
                <span className="text-white font-bold ml-4 text-2xl">
                  {users?.total?.toString().padStart(5, "0")}
                </span>
              </p>
            </div>

            <div>
              <h2 className="underline text-xl font-bold mt-4 mb-6">
                Latest Users
              </h2>
              <div className="w-full lg:flex lg:w-fit lg:justify-between gap-8 xl:gap-16">
                {users?.latestusers?.map((user) => {
                  console.log(user);
                  return (
                    <div
                      id={user._id}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                      key={user.email}
                      className="lg:w-[12rem] xl:w-[16rem] pb-4 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-navHoverGreen h-fit"
                    >
                      <div className="w-full h-full pb-2">
                        {user?.empPhoto ? (
                          <div className="relative">
                            <img
                              className="w-full h-48 object-fill"
                              src={`http://localhost:3000/employee_picture/${user.empPhoto}`}
                              alt="image"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              className="w-full h-full object-cover"
                              src={placeholder}
                              alt="image"
                            />
                          </div>
                        )}
                      </div>
                      <div className="px-6 py-4">
                        <div className="text-xl font-semibold text-gray-800 text-nowrap">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <p className="text-gray-600">{user?.role.name}</p>
                        <p className="text-gray-600">{user?.email}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-fit pr-8 py-8 pl-16  flex flex-col">
          <h2 className="font-bold text-left text-xl underline mb-8">
            Lastest Activity
          </h2>
          <div className="w-full flex gap-2 overflow-auto">
            <table className="divide-y divide-gray-200">
              <thead className="bg-secondary">
                <tr>
                  {columns.map((col, index) => {
                    return (
                      <th
                        className="px-6 py-3 border-r border-white text-left text-xs font-bold text-white uppercase tracking-wider"
                        key={index}
                      >
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {users?.activity?.map((row) => {
                  console.log(row);
                  let date = new Date(row.date);
                  let hours = date.getHours();
                  const minutes = date.getMinutes();

                  // Determine AM or PM suffix
                  const ampm = hours >= 12 ? "PM" : "AM";
                  const formattedMinutes =
                    minutes < 10 ? "0" + minutes : minutes;
                  const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;
                  return (
                    <tr
                      className="bg-white dark:bg-secondaryDark dark:text-white border-t border-gray-200"
                      key={row._id}
                    >
                      
                      <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                        {row.user.email}
                      </td>
                       <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200 ">{row.endpoint}</td> 
                      <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                        {row.action}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                        {row.requestType}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                        {row.date.split("T")[0]}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap border-r border-gray-200">
                        {formattedTime}
                      </td>
                      <td
                        className={`px-6 py-3 whitespace-nowrap border-r border-gray-200 text-center font-semibold leading-5 ${
                          row.status == "success"
                            ? "text-green-500 bg-green-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {row.status.toUpperCase()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;

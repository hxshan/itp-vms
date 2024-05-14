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
  const navigate = useNavigate()
  const [counts, setCounts] = useState([0, 0, 0]);
  const [total, setTotal] = useState(0);
  const [image, setImage] = useState("");
  const { user } = useAuthContext();

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/user/",
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
    let active = 0;
    let inactive = 0;
    let suspended = 0;
    if (users && users.length > 0) {
      users.forEach((user) => {
        if (user.status == "active") active += 1;
        if (user.status == "inactive") inactive += 1;
        if (user.status == "suspended") suspended += 1;
      });
    }
    if (users?.personal?.empPhoto) {
      setImage(users.personal.empPhoto);
    }
    setCounts([active, inactive, suspended]);
    setTotal(active + inactive + suspended);
  }, [users]);
  useEffect(() => {
    getData();
  }, []);

  const chartData = {
    labels: ["Active", "Inactive", "Suspended"],
    datasets: [
      {
        label: "No of Users",
        data: counts,
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

  var lastThreeUsers = users.slice(users?.length - 2);

  return (
    <div className="w-full h-fit bg-white dark:bg-slate-800 p-8 rounded-md flex flex-col lg:flex-row gap-16">
      <div>
        <h2 className="font-bold text-center text-xl underline">Stores user details</h2>
        <div className="mt-8 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]">
          <Pie data={chartData} />
        </div>
      </div>
      <div className="h-fit w-full flex flex-col gap-4">
        <div className="w-full mt-10 py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
          <p className="text-white text-xl font-semibold">
            Active Users :{" "}
            <span className="text-white font-bold ml-4 text-2xl">
              {String(counts[0]).padStart(5, "0")}
            </span>
          </p>
        </div>
        <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
          <p className="text-white text-xl font-semibold">
            Inactive Users :{" "}
            <span className="text-white font-bold ml-4 text-2xl">
              {String(counts[1]).padStart(5, "0")}
            </span>
          </p>
        </div>
        <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
          <p className="text-white text-xl font-semibold">
            Supsended Users :{" "}
            <span className="text-white font-bold ml-4 text-2xl">
              {String(counts[2]).padStart(5, "0")}
            </span>
          </p>
        </div>
        <div className="w-full py-4 px-8 bg-gradient-to-r from-navHoverGreen to-actionGreen rounded-md h-fit">
          <p className="text-white text-xl font-semibold">
            Total No of Users :{" "}
            <span className="text-white font-bold ml-4 text-2xl">
              {String(total).padStart(5, "0")}
            </span>
          </p>
        </div>

        <div>
          <h2 className="underline text-xl font-bold mt-4 mb-6">
            Latest Users
          </h2>
          <div className="w-full lg:flex lg:w-fit lg:justify-between gap-8 xl:gap-16">
            {lastThreeUsers.map((user) => {
              console.log(user)
              return (
                <div
                  id={user._id}
                  onClick={(e)=>{handleClick(e)}}
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
  );
};

export default DashboardHero;

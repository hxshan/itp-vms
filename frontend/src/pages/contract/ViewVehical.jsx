import React from "react";

const ViewVehical = ({ vehicalData, isOpen, Toggle }) => {
  return (
    <div
      className={`${
        isOpen ? "" : "hidden"
      } flex flex-col bg-dimWhite fixed top-0 left-0 pt-[20px] justify-center items-center w-full h-screen z-[50]  `}
      onClick={Toggle}
    >
      <div
        className="flex bg-white flex-col  h-fit py-4 px-12 rounded-lg w-[1000px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center mb-4 border-b-2 ">
          <h1 className=" text-[20px] font-bold ">Vehical Info</h1>
        </div>
        {vehicalData.category ? (
          <div className="flex justify-evenly">
            <div>
              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Vehical Category</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.category}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Vehical Type</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleType}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Register Number</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleRegister}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Vehicle Model</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleModel}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Fuel Type</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.fuelType}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Manufacture Year</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleManuYear}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Engine Capacity</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.engineCap} lr
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>last Mileage</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.lastMileage} km
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Vehical Type</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleColour}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Vehical Gear System</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.vehicleGearSys}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Air conditioner available?</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.airCon}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Number of Seats</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.numOfSeats}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Air conditioner available?</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.airCon}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>Number of Seats</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.numOfSeats}
                  </p>
                </div>
              </div>
              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>laugage space</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.lugSpace}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>GPS available?</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.gps}
                  </p>
                </div>
              </div>

              <div className="flex mt-3 gap-12">
                <div className="flex flex-col gap-1">
                  <label>Fridge available?</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.fridge === "no" ? "unavailable" : "available"}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label>TV available?</label>
                  <p className="shadow appearance-none border rounded w-[180px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {vehicalData.tv === "no" ? "unavailable" : "available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Please select a vehical</p>
        )}

        <div className="flex justify-center ">
          <button
            className=" bg-orange-600 px-5 py-2 rounded-lg w-[150px] mt-5 font-bold text-white"
            onClick={Toggle}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewVehical;

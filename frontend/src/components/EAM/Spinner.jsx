import React from "react";
import { ClockLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="w-full h-[300px] bg-white shadow-lg border border-gray-200 flex justify-center items-center">
         
        <ClockLoader
          color="#36d7b7"
          size={60}
        />
      </div>
    );
}

export default Spinner;

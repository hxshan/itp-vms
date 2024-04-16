import React, { useRef } from 'react';
import { ReactToPrint } from 'react-to-print';
import { TripSummary } from './TripSummary';

const PrintableTripSummary = ({ trip, onClose }) => {
    const componentRef = useRef();
  
    return (
      <>
        <TripSummary ref={componentRef} trip={trip} onClose={onClose} />
        <div className="flex justify-center mt-4">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Print Trip Summary
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </>
    );
  };
  
  export default PrintableTripSummary;

import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import ReactToPrint from "react-to-print";
import { usePDF } from 'react-to-pdf';

Modal.setAppElement('#root');

const Report = ({ filteredData, setShowReport }) => {
    if (!filteredData) {
        return null;
    }

    const { toPDF, targetRef } = usePDF({
        filename: 'page.pdf',
        options: {
            format: 'A4',
            orientation: 'portrait',
            margin: {
                top: '10cm',
                right: '1cm',
                left: '1cm',
                bottom: '1cm'
            },
        },
    });
    
/*
    const pieData = {
        labels: ['Top Customers', 'Other Customers'],
        datasets: [{
            data: [combinedMetrics.percentageRevenueTopCustomers, 100 - combinedMetrics.percentageRevenueTopCustomers],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        }],
    }*/

    const cancel = () => {
        setShowReport(false);
    };


/*
    const pieDataHireStats = {
        labels: ['Active', 'Pending', 'Canceled', 'Completed'],
        datasets: [{
            data: [
                hireCounts.active || 0,
                hireCounts.pending || 0,
                hireCounts.canceled || 0,
                hireCounts.completed || 0
            ],
            backgroundColor: ['#10B981', '#FBBF24', '#F97316', '#3B82F6'],
            hoverBackgroundColor: ['#047857', '#B45309', '#B45309', '#1E3A8A'],
        }],
    };
    
*/
    return (

        <Modal
            isOpen={true}
            onRequestClose={() => setShowReport(false)}
            style={{
              content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  borderWidth: '2px',
                  borderColor: 'green-600',
                  width: '80%',
                  height: '90%',
                  marginBottom: 'mb-6',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  padding: 'p-6'
              },
              overlay: {
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  backgroundColor: 'transparent',
                  bgOpacity: '50',
                  zIndex: '50',
                  backdropFilter: 'blur(4px)',
              },
          }}
        >
            <div className='px-10 py-5'>
                <div className="mb-5 p-6" ref={targetRef}>
                    <h2 className="text-xl font-bold mb-5 text-center">Hire Data</h2>

                    <div className="mb-5">
                        <table className="min-w-full divide-y divide-gray-200">
                        {/* Table header */}
                            <thead className="bg-secondary">
                                <tr>
                                    <th className="relative px-6 py-3 border-r border-white text-white">Vehicle No</th>
                                    <th className="relative px-6 py-3 border-r border-white text-white">Start Date</th>
                                    <th className="relative px-6 py-3 border-r border-white text-white">End Date</th>
                                    <th className="relative px-6 py-3 border-r border-white text-white">Cus Mobile</th>
                                    <th className="relative px-6 py-3 border-r border-white text-white">Status</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                                <tbody>
                                    {filteredData.length === 0 ? (
                                        <td colSpan="6" className="text-center py-4">No data available</td>
                                    ) : (
                                        filteredData.map((hire) => (
                                            <tr key={hire._id} className="bg-white border-t border-gray-200">
                                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200"> {hire.vehicle?.vehicleRegister || 'N/A'}</td>

                                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(hire.startDate).toLocaleDateString()}</td>
                                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{new Date(hire.endDate).toLocaleDateString()}</td>
                                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">{hire.cusMobile}</td>
                                                <td className="px-6 py-2 whitespace-nowrap border-r border-gray-200">
                                                    <div className={`text-center rounded-md ${hire.hireStatus.toLowerCase() === 'active' ? 'text-green-600 bg-green-100' : hire.hireStatus.toLowerCase() === 'pending' ? 'text-yellow-600 bg-yellow-100' : hire.hireStatus.toLowerCase() === 'ongoing' ? 'text-green-600 bg-green-100' : hire.hireStatus.toLowerCase() === 'completed' ? 'text-blue-600 bg-blue-100' : 'text-orange-600 bg-orange-100'}`}>
                                                        {hire.hireStatus.toUpperCase()}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                        </table>                  
                    </div>

                </div>

                <div className="flex justify-between">
                    <button className="py-2 px-6 bg-actionBlue text-white rounded-md mr-4" onClick={cancel}>Cancel</button>
              
                    <button className="py-2 px-6 text-white bg-actionRed focus:outline-none rounded-md mr-4" onClick={() => toPDF()}>Save</button>  
                </div>

                
                
            </div>
            

        </Modal>
        
    );
};

Report.propTypes = {
    setShowReport: PropTypes.func.isRequired,
};

export default Report;

import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import ReactToPrint from "react-to-print";
import { usePDF } from 'react-to-pdf';

Modal.setAppElement('#root');

const Report = ({ reportData, setShowReport }) => {
    if (!reportData) {
        return null;
    }

    const {hireCounts, businessPerformance, customerMetrics, combinedMetrics } = reportData;
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
    

    const pieData = {
        labels: ['Top Customers', 'Other Customers'],
        datasets: [{
            data: [combinedMetrics.percentageRevenueTopCustomers, 100 - combinedMetrics.percentageRevenueTopCustomers],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        }],
    }

    const cancel = () => {
        setShowReport(false);
    };



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
                    <h2 className="text-xl font-bold mb-5 text-center">Month Summery</h2>

                    <div className="mb-5">
                        <h3 className="text-lg font-semibold mb-2">Hire Statics</h3>
                        <div className='flex justify-between items-center space-x-10'>
                            <ul className='leading-loose '>
                                <li>Total Hires: {hireCounts.totalHires}</li>
                                <li>Pending Hires: {hireCounts.pending || 'N/A'}</li>
                                <li>Active Hires: {hireCounts.active || 'N/A'} </li>
                                <li>Completed Hires: {hireCounts.completed || 'N/A'} </li>
                                <li>Canceled Hires: {hireCounts.canceled || 'N/A'}</li>
                            </ul>

                            <div className='w-[300px] h-[300px]'>
                                <Pie data={pieDataHireStats} />
                            </div>
                        </div>                  
                    </div>

                    {/* Business Performance Metrics */}
                    <div className="w-full md:w-1/2 mb-5">
                        <h3 className="text-lg font-semibold mb-2">Business Performance Metrics</h3>
                        <ul className='leading-loose '>
                            <li>Total Hires: {hireCounts.totalHires}</li>
                            <li>Total Revenue: Rs. {businessPerformance?.totalRevenue.toFixed(2) || 'N/A'}</li>
                            <li>Average Distance: {businessPerformance?.averageDistance.toFixed(2) || 'N/A'} miles</li>
                            <li>Average Time Taken: {businessPerformance?.averageTimeTaken?.toFixed(2) ?? 'N/A'} hours</li>
                            <li>Total Advanced Payments: Rs. {businessPerformance?.totalAdvancedPayments.toFixed(2) || 'N/A'}</li>
                            <li>Average Advanced Payment: Rs. {businessPerformance?.averageAdvancedPayment.toFixed(2) || 'N/A'}</li>
                        </ul>
                    </div>

                    {/* Customer Metrics */}
                    <div className="w-full md:w-1/2 mb-5">
                        <h3 className="text-lg font-semibold mb-2">Customer Metrics</h3>
                        <ul className='leading-loose '>
                            <li>Total Customers: {customerMetrics.totalCustomers}</li>
                            <li>Total Revenue from Top Customers: Rs. {customerMetrics?.totalRevenueTopCustomers.toFixed(2) || 'N/A'}</li>
                            <li>Average Distance for Top Customers: {customerMetrics?.averageDistanceTopCustomers.toFixed(2) || 'N/A'} miles</li>
                            <li>Average Time Taken for Top Customers: {customerMetrics?.averageTimeTakenTopCustomers?.toFixed(2) ?? 'N/A'} hours</li>
                            <li>Average Spending Per Hire for Top Customers: Rs. {customerMetrics?.averageSpendingPerHireTopCustomers.toFixed(2) || 'N/A'}</li>
                        </ul>
                    </div>

                    {/* Combined Metrics */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Combined Metrics</h3>
                        <ul className='leading-loose '>
                            <li>Percentage of Revenue from Top Customers: {combinedMetrics?.percentageRevenueTopCustomers.toFixed(2) || 'N/A'}%</li>
                        </ul>
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
    reportData: PropTypes.shape({
        hireCounts: PropTypes.shape({
            totalHires: PropTypes.number.isRequired,
            active: PropTypes.number.isRequired,
            pending: PropTypes.number.isRequired,
            canceled: PropTypes.number,
            completed: PropTypes.number.isRequired,
        }).isRequired,
        businessPerformance: PropTypes.shape({
            totalRevenue: PropTypes.number.isRequired,
            averageDistance: PropTypes.number.isRequired,
            averageTimeTaken: PropTypes.number,
            totalAdvancedPayments: PropTypes.number.isRequired,
            averageAdvancedPayment: PropTypes.number.isRequired,
        }).isRequired,
        customerMetrics: PropTypes.shape({
            totalCustomers: PropTypes.number.isRequired,
            topCustomers: PropTypes.arrayOf(PropTypes.string).isRequired,
            totalRevenueTopCustomers: PropTypes.number.isRequired,
            averageDistanceTopCustomers: PropTypes.number.isRequired,
            averageTimeTakenTopCustomers: PropTypes.number,
            averageSpendingPerHireTopCustomers: PropTypes.number.isRequired,
        }).isRequired,
        combinedMetrics: PropTypes.shape({
            percentageRevenueTopCustomers: PropTypes.number.isRequired,
        }).isRequired,  
    }),
    setShowReport: PropTypes.func.isRequired,
};

export default Report;

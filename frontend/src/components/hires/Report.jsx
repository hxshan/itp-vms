import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

Modal.setAppElement('#root');

const Report = ({ reportData, setShowReport }) => {
    if (!reportData) {
        return null;
    }

    const { businessPerformance, customerMetrics, combinedMetrics } = reportData;

    const pieData = {
        labels: ['Top Customers', 'Other Customers'],
        datasets: [{
            data: [combinedMetrics.percentageRevenueTopCustomers, 100 - combinedMetrics.percentageRevenueTopCustomers],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        }],
    }
    

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
            <div className="mt-5">
                <h2 className="text-xl font-bold mb-3">Summery</h2>

                {/* Business Performance Metrics */}
                <div className="mb-5">
                    <h3 className="text-lg font-semibold mb-2">Business Performance Metrics</h3>
                    <ul>
                        <li>Total Hires: {businessPerformance.totalHires}</li>
                        <li>Total Revenue: Rs. {businessPerformance?.totalRevenue.toFixed(2) || 'N/A'}</li>
                        <li>Average Distance: {businessPerformance?.averageDistance.toFixed(2) || 'N/A'} miles</li>
                        <li>Average Time Taken: {businessPerformance?.averageTimeTaken?.toFixed(2) ?? 'N/A'} hours</li>
                        <li>Total Advanced Payments: Rs. {businessPerformance?.totalAdvancedPayments.toFixed(2) || 'N/A'}</li>
                        <li>Average Advanced Payment: Rs. {businessPerformance?.averageAdvancedPayment.toFixed(2) || 'N/A'}</li>
                    </ul>
                </div>

                {/* Customer Metrics */}
                <div className="mb-5">
                    <h3 className="text-lg font-semibold mb-2">Customer Metrics</h3>
                    <ul>
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
                    <Pie data={pieData} />
                    <ul>
                        <li>Percentage of Revenue from Top Customers: {combinedMetrics?.percentageRevenueTopCustomers.toFixed(2) || 'N/A'}%</li>
                    </ul>
                </div>
            </div>

        </Modal>
        
    );
};

Report.propTypes = {
    reportData: PropTypes.shape({
        businessPerformance: PropTypes.shape({
            totalHires: PropTypes.number.isRequired,
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

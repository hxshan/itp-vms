const userActivity = require('../models/userActivityModel')

const logUserActivity = async (req,statusCode,type,action) => {
    try {
        const { user } = req;
        const {originalUrl } = req;
        const status = statusCode >= 200 && statusCode < 300 ? 'success' : 'failure';
        const record = new userActivity({
            user: user._id,
            date: new Date(),
            requestType: type,
            endpoint: originalUrl,
            status: status,
            action:action
        });
        console.log(record)
        await record.save();
    
    } catch (error) {
        console.error('Error logging user activity:', error);
    }
};

module.exports=logUserActivity
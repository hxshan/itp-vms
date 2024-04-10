// validation.js

// Function to validate vehicle type
export const validateVehicleType = (category) => {
    
    if (!category) {
        alert('Please select the vehicle type.');
        return false;
    }

    return true; // You can add more complex validation logic here if needed
};

// Function to validate vehicle ID
export const validateVehicleId = (vehicleRegister) => {
    if (vehicleRegister.length < 7) {
        alert('Enter the valid vehicle number ');
        return false;
    }

    return true;
     // Assuming vehicle ID should be 7 characters long
};

// Function to validate vehicle issue
export const validateVehicleIssue = (vrissue) => {
    if (!vrissue) {
        alert('Please mention the issue.');
        return false;
    }
    return true; /// You can add more complex validation logic here if needed
};

// Function to validate vehicle cost
export const validateVehicleCost = (vrcost) => {
    if (!(vrcost > 0)) {
        alert('Please provide the estimated cost.');
        return false;
    }
    return true; // Assuming cost should be a positive number
};


// Function to validate additional information
export const validateAdditionalInfo = (vraddit) => {
    if (!vraddit) {
        alert('Please Note');
        return false;
    }
    return true;
};

export const validateSDate = (vrsdate) => {
    if (!(new Date(vrsdate) >= new Date())) {
        alert('Start date must be a future date');
        return false;
    }
    return true;
};

export const validateEDate = (vrsdate,vredate) => {
    if (!(new Date(vrsdate) <= new Date(vredate))) {
        alert('End date must be greater than start date');
        return false;
    }
    return true;
};
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validateFormFirstPage = (FormData) => {
    const error = {};

    if (FormData.startDate === '') {
        error.startDate = 'Please Enter Start Date'
        toast.error('Please Enter Start Date')
        return error
    
    }

    const today = new Date()
    const startDate = new Date(FormData.startDate)

    

    if (FormData.endDate === '') {
        error.endDate = 'Please Enter StartDate'
        toast.error('Please Enter End Date')
        return error
    }

    const endDate = new Date(FormData.endDate)

    if (endDate < startDate ) {
        error.endDate = 'Please Enter valid StartDate'
        toast.error('Please Enter valid End Date')
        return error
    }

    if (FormData.vehicleType  === '') {
        error.vehicleType = 'Please Enter Vehicle Type'
        toast.error('Please Enter Vehicle Type')
        return error
    }
    
    if (FormData.passengerCount  === '') {
        error.passengerCount = 'Please Enter passenger Count'
        toast.error('Please Enter Passenger Count')
        return error
    }

    if (FormData.passengerCount  <= 0) {
        error.passengerCount = 'Please Enter Valid passenger Count'
        toast.error('Please Enter Valid Passenger Count')
        return error
    }

    return error
}


const validateFormSecondPage = (FormData) => {
    const error = {};

    if (FormData.vehicle  === '') {
        error.vehicle = 'Please Enter vehicle'
        toast.error('Please Select a vehicle')
        return error
    }
    if (FormData.driver  === '') {
        error.driver = 'Please Select a Driver'
        toast.error('Please Select a Driver')
        return error
    }
    if (FormData.startPoint  === '') {
        error.startPoint = 'Please Enter Start point'
        toast.error('Please Enter Start point')
        return error
    }
    if (FormData.endPoint  === '') {
        error.endPoint = 'Please Enter End Point'
        toast.error('Please Enter End Point')
        return error
    }

    if (FormData.startTime  === '') {
        error.startTime = 'Please Enter Start Time'
        toast.error('Please Enter Start Time')
        return error
    }
    
    if (FormData.estimatedDistance  === '') {
        error.estimatedDistance = 'Please Enter distance'
        toast.error('Please Enter distance')
        return error
    }

    if (FormData.estimatedDistance  <= 0) {
        error.estimatedDistance = 'Please Enter valid estimatedDistance'
        toast.error('Please Enter valid distance')
        return error
    }


    return error
}

const validateFormtthirddPage = (FormData) => {
    const error = {};

    if (FormData.cusName  === '') {
        error.cusName = 'Please Enter Customer Name'
        toast.error('Please Enter Customer Name')
        return error
    }

    if (FormData.cusEmail  === '') {
        error.cusEmail = 'Please Enter Customer Email'
        toast.error('Please Enter Customer Email')
        return error
    }

    if (FormData.cusMobile  === '') {
        error.cusMobile = 'Please Enter Customer Mobile'
        toast.error('Please Enter Customer Mobile')
        return error
    }
    if (!/^\d{9,10}$/.test(FormData.cusMobile) ) {
        error.cusMobile = 'Please Enter valid Customer Mobile'
        toast.error('Please Enter valid Customer Mobile')
        return error
    }

    if (FormData.cusNic  === '') {
        error.cusNic = 'Please Enter Customer NIC'
        toast.error('Please Enter Customer NIC ')
        return error
    }

    return error
}


/*
const validateForm = (FormData) => {
    const error = {};

    console.log("Validation js eke inne")

    if (FormData.startDate === '') {
        error.startDate = 'Please Enter Start Date'
        toast.error('Please Enter Start Date')
        return error
    }

    if (FormData.endDate === '') {
        error.startDate = 'Please Enter StartDate'
        toast.error('Please Enter End Date')
        return error
    }

    if (FormData.vehicleType  === '') {
        error.startDate = 'Please Enter Vehicle Type'
        toast.error('Please Enter Vehicle Type')
        return error
    }
    
    if (FormData.vehicleSubcategory  === '') {
        error.startDate = 'Please Enter vehicle Subcategory'
        toast.error('Please Enter vehicleSubcategory')
        return error
    }
    
    if (FormData.passengerCount  === '') {
        error.startDate = 'Please Enter passenger Count'
        toast.error('Please Enter Passenger Count')
        return error
    }
    if (FormData.vehicle  === '') {
        error.startDate = 'Please Enter vehicle'
        toast.error('Please Select a vehicle')
        return error
    }
    if (FormData.driver  === '') {
        error.startDate = 'Please Select a Driver'
        toast.error('Please Select a Driver')
        return error
    }
    if (FormData.startPoint  === '') {
        error.startDate = 'Please Enter Start point'
        toast.error('Please Enter Start point')
        return error
    }
    if (FormData.endPoint  === '') {
        error.startDate = 'Please Enter End Point'
        toast.error('Please Enter End Point')
        return error
    }
    
    if (FormData.distance  === '') {
        error.startDate = 'Please Enter distance'
        toast.error('Please Enter distance')
        return error
    }
    if (FormData.cusName  === '') {
        error.startDate = 'Please Enter Customer Name'
        toast.error('Please Enter Customer Name')
        return error
    }
    if (FormData.cusEmail  === '') {
        error.startDate = 'Please Enter Customer Email'
        toast.error('Please Enter Customer Email')
        return error
    }
    if (FormData.cusMobile  === '') {
        error.startDate = 'Please Enter Customer Mobile'
        toast.error('Please Enter Customer Mobile')
        return error
    }
    if (FormData.cusNic  === '') {
        error.startDate = 'Please Enter Customer NIC'
        toast.error('Please Enter Customer NIC ')
        return error
    }


    return error
}

*/

export { validateFormFirstPage, validateFormSecondPage, validateFormtthirddPage};
const validateFormFirstPage = (FormData) => {
    const error = {};

    if (FormData.startDate === '') {
        error.startDate = 'Please Enter Start Date'
        alert('Please Enter Start Date')
        return error
    
    }

    const today = new Date()
    const startDate = new Date(FormData.startDate)

    if (startDate < today) {
        error.startDate = 'Please Enter Valid Start Date'
        alert('Please Enter Valid Start Date')
        return error
    }

    if (FormData.endDate === '') {
        error.endDate = 'Please Enter StartDate'
        alert('Please Enter End Date')
        return error
    }

    const endDate = new Date(FormData.endDate)

    if (endDate < startDate ) {
        error.endDate = 'Please Enter valid StartDate'
        alert('Please Enter valid End Date')
        return error
    }

    if (FormData.vehicleType  === '') {
        error.vehicleType = 'Please Enter Vehicle Type'
        alert('Please Enter Vehicle Type')
        return error
    }
    
    if (FormData.vehicleSubcategory  === '') {
        error.vehicleSubcategory = 'Please Enter vehicle Subcategory'
        alert('Please Enter vehicleSubcategory')
        return error
    }
    
    if (FormData.passengerCount  === '') {
        error.passengerCount = 'Please Enter passenger Count'
        alert('Please Enter Passenger Count')
        return error
    }

    if (FormData.passengerCount  <= 0) {
        error.passengerCount = 'Please Enter Valid passenger Count'
        alert('Please Enter Valid Passenger Count')
        return error
    }

    return error
}


const validateFormSecondPage = (FormData) => {
    const error = {};

    if (FormData.vehicle  === '') {
        error.vehicle = 'Please Enter vehicle'
        alert('Please Select a vehicle')
        return error
    }
    if (FormData.driver  === '') {
        error.driver = 'Please Select a Driver'
        alert('Please Select a Driver')
        return error
    }
    if (FormData.startPoint  === '') {
        error.startPoint = 'Please Enter Start point'
        alert('Please Enter Start point')
        return error
    }
    if (FormData.endPoint  === '') {
        error.endPoint = 'Please Enter End Point'
        alert('Please Enter End Point')
        return error
    }
    
    if (FormData.distence  === '') {
        error.distence = 'Please Enter distence'
        alert('Please Enter Distence')
        return error
    }

    if (FormData.distence  <= 0) {
        error.distence = 'Please Enter valid distence'
        alert('Please Enter valid Distence')
        return error
    }

    if (FormData.cusName  === '') {
        error.cusName = 'Please Enter Customer Name'
        alert('Please Enter Customer Name')
        return error
    }

    if (FormData.cusEmail  === '') {
        error.cusEmail = 'Please Enter Customer Email'
        alert('Please Enter Customer Email')
        return error
    }

    if (FormData.cusMobile  === '') {
        error.cusMobile = 'Please Enter Customer Mobile'
        alert('Please Enter Customer Mobile')
        return error
    }
    if (!/^\d{9,10}$/.test(FormData.cusMobile) ) {
        error.cusMobile = 'Please Enter valid Customer Mobile'
        alert('Please Enter valid Customer Mobile')
        return error
    }

    if (FormData.cusNic  === '') {
        error.cusNic = 'Please Enter Customer NIC'
        alert('Please Enter Customer NIC ')
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
        alert('Please Enter Start Date')
        return error
    }

    if (FormData.endDate === '') {
        error.startDate = 'Please Enter StartDate'
        alert('Please Enter End Date')
        return error
    }

    if (FormData.vehicleType  === '') {
        error.startDate = 'Please Enter Vehicle Type'
        alert('Please Enter Vehicle Type')
        return error
    }
    
    if (FormData.vehicleSubcategory  === '') {
        error.startDate = 'Please Enter vehicle Subcategory'
        alert('Please Enter vehicleSubcategory')
        return error
    }
    
    if (FormData.passengerCount  === '') {
        error.startDate = 'Please Enter passenger Count'
        alert('Please Enter Passenger Count')
        return error
    }
    if (FormData.vehicle  === '') {
        error.startDate = 'Please Enter vehicle'
        alert('Please Select a vehicle')
        return error
    }
    if (FormData.driver  === '') {
        error.startDate = 'Please Select a Driver'
        alert('Please Select a Driver')
        return error
    }
    if (FormData.startPoint  === '') {
        error.startDate = 'Please Enter Start point'
        alert('Please Enter Start point')
        return error
    }
    if (FormData.endPoint  === '') {
        error.startDate = 'Please Enter End Point'
        alert('Please Enter End Point')
        return error
    }
    
    if (FormData.distence  === '') {
        error.startDate = 'Please Enter distence'
        alert('Please Enter Distence')
        return error
    }
    if (FormData.cusName  === '') {
        error.startDate = 'Please Enter Customer Name'
        alert('Please Enter Customer Name')
        return error
    }
    if (FormData.cusEmail  === '') {
        error.startDate = 'Please Enter Customer Email'
        alert('Please Enter Customer Email')
        return error
    }
    if (FormData.cusMobile  === '') {
        error.startDate = 'Please Enter Customer Mobile'
        alert('Please Enter Customer Mobile')
        return error
    }
    if (FormData.cusNic  === '') {
        error.startDate = 'Please Enter Customer NIC'
        alert('Please Enter Customer NIC ')
        return error
    }


    return error
}

*/

export { validateFormFirstPage, validateFormSecondPage};
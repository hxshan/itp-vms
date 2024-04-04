const mongoose = require('mongoose')


const Schema = mongoose.Schema

const roleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    userPermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    vehiclePermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    vehicleMaintenencePermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    hirePermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    contractPermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    emergencyPermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    financePermissions:{
        Create:{
            type:Boolean,
            default:false,
            required:true
        },
        Read:{
            type:Boolean,
            default:false,
            required:true
        },
        Update:{
            type:Boolean,
            default:false,
            required:true
        },
        Delete:{
            type:Boolean,
            default:false,
            required:true
        }
    },
    isDriver:{
        type:Boolean,
        default:false,
        required:true
    }
    
})

module.exports = mongoose.model('Role',roleSchema)
const vehicleMaintain = require ('../models/vehicleMaintananceModel')

const createmaintain = async (req , res)=>{
    try{
        if (
            !req.body.vrtype||
            !req.body.vrid||
            !req.body.vrissue||
            !req.body.vrcost||
            !req.body.vraddit

        ) {
            return res.status(400).send({message:'Send required Fields'});
            
        }
        const maintain ={
            vrtype : req.body.vrtype,
            vrid : req.body.vrid,
            vrissue : req.body.vrissue,
            vrcost : req.body.vrcost,
            vraddit : req.body.vraddit
        };
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
} ;

module.exports = {createmaintain}
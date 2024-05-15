const express = require("express");
const Auth = require("../middleware/Auth");
const {
  createContract,
  createClient,
  getContractbyID,
  getClientbyId,
  getallContract,
  getallClients,
  updateContract,
  updateClient,
  deleteClient,
  deleteContract,
  fetchVehicles,
  getVehicle,
  createRequest,
  getallRequests,
  deleteRequest,
  getRequestbyID,
  getContractbyClientID
} = require("../controllers/contractController");


const router = express.Router();

router.post("/:id/create", Auth ,createContract);
router.post("/createClient", Auth, createClient);
router.get("/getClient/:id", getClientbyId);
router.get("/getContract/:id", getContractbyID);
router.get("/getAllContracts", getallContract);
router.get("/getClients", getallClients);
router.patch("/updateContract/:id",Auth, updateContract);
router.patch("/updateClient/:id", updateClient);
router.delete("/deleteClient/:id", deleteClient);
router.delete("/deleteContract/:id",Auth, deleteContract);
router.get("/vehicals", fetchVehicles);
router.get("/getvehical/:id", getVehicle);
router.post("/createRequest",createRequest)
router.get("/getAllRequest",getallRequests)
router.delete("/deleteRequest/:id",deleteRequest)
router.get("/getRequestbyID/:id",getRequestbyID)
router.get("/getContractbyClientID/:id",getContractbyClientID)

module.exports = router;

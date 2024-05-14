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
} = require("../controllers/contractController");

const router = express.Router();

router.post("/:id/create", createContract);
router.post("/createClient", createClient);
router.get("/getClient/:id", getClientbyId);
router.get("/getContract/:id", getContractbyID);
router.get("/getAllContracts", getallContract);
router.get("/getClients", getallClients);
router.patch("/updateContract/:id", updateContract);
router.patch("/updateClient/:id", updateClient);
router.delete("/deleteClient/:id", deleteClient);
router.delete("/deleteContract/:id", deleteContract);
router.get("/vehicals", fetchVehicles);
router.get("/getvehical/:id", getVehicle);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createMaintenance,
  getAllMaintenances,
  getAllHistory,
  updateMainteancesStatus
} = require("../controllers/mainteancesController");

router.post("/mainteancesPost", createMaintenance);
router.get("/getAllmainteances", getAllMaintenances);
router.get("/getAllHistory",getAllHistory);
router.patch("/updateMainteancesStatus/:id",updateMainteancesStatus)
module.exports = router;

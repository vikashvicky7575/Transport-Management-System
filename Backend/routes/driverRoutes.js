const express = require("express")
const router = express.Router();
const { addDriver, driverDetails, uniqueDriverDetails } = require("../controllers/driverController");
const upload = require("../middleware/upload");

//post code
router.post("/add", upload.single("photo"), addDriver);
router.post("/uniqueDriverDetails", uniqueDriverDetails)

//Get Code
router.get("/driverDetails", driverDetails)

module.exports = router;
const express = require("express");
const multer = require("multer");
const Vehicle = require("../models/Vehicle");
const path = require("path");

const router = express.Router();

// Setup storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filter (optional - you can restrict file types here)
const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST route to add vehicle
router.post("/add-vehicle", upload.single("vehicleImage"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Vehicle image is required." });
    }

    const vehicleData = {
      vehicleNumber: req.body.vehicleNumber,
      vehicleType: req.body.vehicleType,
      chassisNumber: req.body.chassisNumber,
      engineNumber: req.body.engineNumber,
      insuranceExpiry: req.body.insuranceExpiry,
      pollutionExpiry: req.body.pollutionExpiry,
      fuelType: req.body.fuelType,
      brandName: req.body.brandName,
      model: req.body.model,
      fuelTankCapacity: req.body.fuelTankCapacity,
      fcDate: req.body.fcDate,
      manufacturingYear: req.body.manufacturingYear,
      permitType: req.body.permitType,
      vehicleImage: req.file.filename, // Ensure your model uses this key
    };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    res.status(201).json({ message: "Vehicle added successfull", vehicle });
  } catch (error) {
    console.error("Add Vehicle Error:", error);
    if (error.code === 11000) {
      // Extract the field that caused duplication
      const duplicatedField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${duplicatedField} already exists` });
    }

    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// GET Available Vehicles (i.e., not under trip or maintenance)
router.get("/available", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isAvailable: true }); // or your logic
    console.log("not under trip or maintenance:", vehicles);
    res.json(vehicles);
  } catch (error) {
    console.error("Error in /available:", error);
    res.status(500).json({ message: "Error fetching vehicles" });
  }
});

//get vehicle details in mongoDB database and show in vehicle List
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    res.status(500).json({ success: false, message: "server Error" });
  }
});

// UPDATE Vehicle by ID (with optional image update)
router.put(
  "/updatevehicle/:_id",
  upload.single("vehicleImage"),
  async (req, res) => {
    console.log("--- PUT /update-vehicle called ---");
    console.log("Vehicle ID:", req.params._id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
      const vehicleId = req.params._id;
      const updateData = { ...req.body };
      if (req.file) {
        updateData.vehicleImage = req.file.filename;
      }

      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        vehicleId,
        updateData,
        { new: true }
      );

      if (!updatedVehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }

      res
        .status(200)
        .json({
          message: "Vehicle updated successfully",
          vehicle: updatedVehicle,
        });
    } catch (error) {
      console.error("Update Vehicle Error:", error);
      res.status(500).json({ message: "Server Error", details: error.message });
    }
  }
);

//Delete Vehicle


module.exports = router;

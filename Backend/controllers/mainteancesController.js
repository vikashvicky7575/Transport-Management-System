const Maintenance = require("../models/Mainteances");
const vehicle = require("../models/Vehicle");

exports.createMaintenance = async (req, res) => {
  try {
    const {
      vehicleId,
      maintenanceType,
      maintenanceDate,
      issuetype,
      issueDescription,
      status,
      companyName,
      MechanicName,
      dispatcher,
    } = req.body;

    const vehicleData = await vehicle.findById(vehicleId);
    if (!vehicleData) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    //Generate MainteanceId like MAI-VEH-001
    const count = await Maintenance.countDocuments();
    const mainteananceId = `MAI-VEH-${(count + 1).toString().padStart(3,"0")}`;


    // Step 1: Create maintenance
    const maintenance = new Maintenance({
      mainteananceId,
      vehicleId,
      vehicleNumber: vehicleData.vehicleNumber,
      maintenanceType,
      maintenanceDate,
      issuetype,
      issueDescription,
      status,
      companyName,
      MechanicName,
      dispatcher,
    });

    await maintenance.save();

    // Step 2: Update vehicle availability based on status
    const isFixed = status === "Fixed";

    await vehicle.findByIdAndUpdate(vehicleId, {
      isAvailable: isFixed,
    });

    res.status(201).json({ message: "Maintenance created", maintenance });
  } catch (error) {
    console.error("Maintenance creation error", error);
    res.status(500).json({ message: "Error creating maintenance" });
  }
};


//Get All Mainteance records
exports.getAllMaintenances = async (req, res) => {
  try {
    const data = await Maintenance.find({ status: { $ne: "Fixed" } }).populate(
      "vehicleId",
      "vehicleNumber brandName vehicleType vehicleImage  isAvailable"
    );
    console.log("Get All Maintenances Datas:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Get Maintenance Details Failed", error);
    res.status(500).json({ message: "Failed to fetch maintenance records" });
  }
};

//get Mainteances All history
exports.getAllHistory = async (req, res) => {
  try {
    const data = await Maintenance.find().populate(
      "vehicleId",
      "vehicleNumber brandName vehicleType vehicleImage  isAvailable"
    );
    console.log("Get All Maintenances Datas:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Get Maintenance Details Failed", error);
    res.status(500).json({ message: "Failed to fetch maintenance records" });
  }
};







//updateMainteances Status
exports.updateMainteancesStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updateMainteance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updateMainteance) {
      return res.status(404).json({ message: "Maintenance record not found" });
    }

    //  If status is Fixed → make vehicle available
    //  If not Fixed → make vehicle unavailable (if needed)
    if (updateMainteance.vehicleId) {
      await vehicle.findByIdAndUpdate(updateMainteance.vehicleId, {
        isAvailable: status === "Fixed" ? true : false,
      });
    }

    console.log("updated status Success", updateMainteance);
    res.status(200).json(updateMainteance);
  } catch (error) {
    console.log("update status Failed", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

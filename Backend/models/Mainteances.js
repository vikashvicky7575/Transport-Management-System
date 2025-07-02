const mongoose = require("mongoose");

const maintenancesSchema = new mongoose.Schema(
  {
    //auto-generate Mainteances ID
    mainteananceId: {
      type: String,
      required: true,
      unique: true,
    },
    //references with vehicle schema
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    vehicleNumber: { type: String, required: false, unique: false },

    maintenanceType: {
      type: String,
      enum: ["General service", "BreakDown", "Emergency"],
      default: "General service",
    },
    maintenanceDate: {
      type: Date,
      required: true,
    },
    issuetype: {
      type: String,
      enum: [
        "Engine",
        "Brake",
        "Tyre",
        "Electrical",
        "Suspension",
        "Oil Change",
        "Others",
      ],
      default: "oil Change",
    },
    issueDescription: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "In Progress",
        "Delayed",
        "Fixed",
        "Waiting For Parts",
        "Sent To WorkShop",
      ],
      default: "In Progress",
    },
    companyName: { type: String, required: true },
    MechanicName: { type: String, required: true },
    dispatcher: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenancesSchema);

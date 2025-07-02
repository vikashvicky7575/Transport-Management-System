
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true },
    vehicleType: { type: String, required: true },
    chassisNumber: { type: String, required: true, unique: true },
    engineNumber: { type: String, required: true, unique: true },
    insuranceExpiry: { type: Date },
    pollutionExpiry: { type: Date },
    vehicleImage: { type: String }, // store filename
    fuelType: { type: String },
    brandName: { type: String },
    model: { type: String },
    fuelTankCapacity: { type: Number },
    fcDate: { type: Date },
    manufacturingYear: { type: Number },
    permitType: { type: String }, // e.g. National or State
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);

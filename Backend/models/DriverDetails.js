const mongoose = require("mongoose");

const driverschema = new mongoose.Schema({
    driverName: String,
    mobileNumber: { type: Number, unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'] },
    photo: String, //image path
    address: String,
    aadharNumber: { type: Number, unique: true },
    licenceNumber: { type: String, unique: true },
    licenceType: String,
    employeeId: { type: String, unique: true },
    joiningDate: Date,
    experience: { type: String, enum: ['<1 year', '1-3 years', '3-5 years', '5+ years'] },
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    emergencyContactName: String,
    emergencyContactNumber: String,
    bankName: String,
    accountNumber: { type: Number, unique: true },
    ifscCode: String,
    isAvailable: { type: Boolean, default: true }
})

module.exports = mongoose.model("DriverDetails", driverschema);
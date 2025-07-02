const Driver = require("../models/DriverDetails");
const Counter = require("../models/Counter")

//post code for driver input values 
exports.addDriver = async (req, res) => {
    try {
        const photo = req.file?.filename;
        const { driverName, mobileNumber, gender, address, aadharNumber, licenceNumber,
            licenseType, joiningDate, experience, bloodGroup, emergencyContactName,
            emergencyContactNumber, bankName, accountNumber, ifscCode } = req.body;

        // Generate sequential employeeId like EMP001
        const counter = await Counter.findOneAndUpdate(
            { id: "driverId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const employeeId = `EMP${String(counter.seq).padStart(3, '0')}`;

        const newDriver = new Driver({
            driverName,
            mobileNumber,
            gender,
            photo,
            address,
            aadharNumber,
            licenceNumber,
            licenseType,
            employeeId,
            joiningDate,
            experience,
            bloodGroup,
            emergencyContactName,
            emergencyContactNumber,
            bankName,
            accountNumber,
            ifscCode
        });

        await newDriver.save();
        res.status(201).json({ message: "Driver Added Successfully ", driver: newDriver })
        console.log(newDriver);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('the error is', error.message)
    }
};

//post unique inputs
exports.uniqueDriverDetails = async (req, res) => {
    
    const { field, value } = req.body;
    let exists = false;

    const query = {};
    query[field] = value;

    const driver = await Driver.findOne(query);
    if (driver) exists = true;

    res.json({ isUnique: !exists });
};


//get Api for Driver Details Show in viewList Driver Details 

exports.driverDetails = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json({ success: true, data: drivers })
    } catch (error) {
        res.status(500).json({ success: false, message: 'server Error' })
    }
}

const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/DriverDetails');

// Trip ID Generator Function
const generateTripId = async () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = String(now.getFullYear()).slice(-3); // e.g. 2025 => 025

  const baseId = `TRIP-${day}${month}${year}`;

  const tripCount = await Trip.countDocuments({ tripId: { $regex: `^${baseId}` } });
  const newTripId = `${baseId}-${tripCount + 1}`;

  return newTripId;
};

// Create Trip Handler
exports.createTrip = async (req, res) => {
  try {
    const {
      vehicle, driver, dispatcher,
      pickupLocation, dropLocation,
      startDateTime, estimatedEndDateTime
    } = req.body;

    console.log("Request Body:", req.body);

    const foundVehicle = await Vehicle.findOne({ _id: vehicle, isAvailable: true });
    const foundDriver = await Driver.findOne({ _id: driver, isAvailable: true });
   
    if (!foundVehicle || !foundDriver) {
      return res.status(400).json({ message: 'Vehicle or Driver is not available.' });
    }
    console.log('notFoundVehicleandDriver:', res)

    // Validate pickup & drop locations
    if (
      !pickupLocation?.name || !pickupLocation?.coordinates?.length === 2 ||
      !dropLocation?.name || !dropLocation?.coordinates?.length === 2
    ) {
      return res.status(400).json({ message: 'Pickup and Drop locations with coordinates are required.' });
    }

    const tripId = await generateTripId();

    const newTrip = new Trip({
      tripId,
      vehicle,
      vehicleNumber: foundVehicle.vehicleNumber,
      vehicleType: foundVehicle.vehicleType,
      vehicleImage: foundVehicle.vehicleImage,
      driver,
      driverName: foundDriver.driverName,
      driverMobileNumber: foundDriver.mobileNumber,
      dispatcher,
      pickupLocation: {
        name: pickupLocation.name,
        coordinates: pickupLocation.coordinates,
      },
      dropLocation: {
        name: dropLocation.name,
        coordinates: dropLocation.coordinates,
      },
      startDateTime,
      estimatedEndDateTime,
      status: 'In Transit'
    });

    await newTrip.save();

    await Vehicle.findByIdAndUpdate(vehicle, { isAvailable: false });
    await Driver.findByIdAndUpdate(driver, { isAvailable: false });

    res.status(201).json(newTrip);

  } catch (err) {
    console.error("Trip creation failed:", err);
    res.status(500).json({ message: 'Trip creation failed', error: err.message });
  }
};

//get all Trip details history
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
    res.status(200).json(trips);
    console.log('All trips history', trips)
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({ message: 'Failed to fetch trips', error: error.message });
  }
}

//get details vehicles and driver in model
exports.getAvailableDriversAndVehicles = async (req, res) => {
  try {
    const drivers = await Driver.find({ isAvailable: true });
    const vehicles = await Vehicle.find({ isAvailable: true });

    console.log("Available drivers:", drivers);
    console.log("Available vehicles:", vehicles);

    if (!drivers.length || !vehicles.length) {
      return res.status(404).json({ message: "No available drivers or vehicles data" });
    }

    return res.status(200).json({ drivers, vehicles });

  } catch (err) {
    console.error("getAvailableDriversAndVehicles Error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error while fetching availability" });
    }
  }
};

//getVehiclesOnTrip Data
exports.getVehiclesOnTrip = async (req, res) => {
  try {
    const trips = await Trip.find({ status: 'In Transit' })
      .populate('driver', 'driverName driverMobileNumber')
      .populate('vehicle', 'vehicleNumber vehicleType');

    res.status(200).json(trips);
  } catch (error) {
    console.error('Failed to fetch vehicles on trip:', error);
    res.status(500).json({ message: 'Failed to fetch vehicles on trip', error });
  }
};

//update trip status complete or Cancelled
exports.updateTripStatus = async (req, res) => {
  try {
    const { tripId, status } = req.body || {};

    // Validation
    if (!tripId || !status) {
      return res.status(400).json({ message: 'Both tripId and status are required.' });
    }

    if (!['Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Status must be either "Completed" or "Cancelled".' });
    }

    // Update trip
    const trip = await Trip.findOneAndUpdate(
      { tripId },
      { status },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: `Trip with ID ${tripId} not found.` });
    }

    // Set driver & vehicle as available
    await Promise.all([
      Vehicle.findByIdAndUpdate(trip.vehicle, { isAvailable: true }),
      Driver.findByIdAndUpdate(trip.driver, { isAvailable: true })
    ]);

    res.status(200).json({
      message: `Trip marked as ${status}. Vehicle and driver are now available.`,
      trip
    });

  } catch (error) {
    console.error('Trip status update failed:', error);
    res.status(500).json({
      message: 'Server error while updating trip status.',
      error: error.message
    });
  }
};




const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripId: { type: String, unique: true, required: true },

  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  vehicleNumber: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleImage: { type: String },

  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'DriverDetails', required: true },
  driverName: { type: String, required: true },
  driverMobileNumber: { type: String, required: true },

  dispatcher: { type: String, required: true },

  pickupLocation: {
    name: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  dropLocation: {
    name: { type: String, required: true },
    coordinates: { type: [Number], required: true }
  },
  startDateTime: { type: Date, required: true },
  estimatedEndDateTime: { type: Date, required: true },

  status: {
    type: String,
    enum: ['In Transit', 'Completed', 'Cancelled'],
    default: 'In Transit'
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
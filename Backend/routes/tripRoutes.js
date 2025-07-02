const express = require('express');
const router = express.Router();
const { createTrip, getAvailableDriversAndVehicles, getVehiclesOnTrip, updateTripStatus, getAllTrips } = require('../controllers/tripController');

//tripRoutes
router.post('/tripPost', createTrip)
router.get('/available', getAvailableDriversAndVehicles)
router.get('/ontripVehicles', getVehiclesOnTrip)
router.patch('/tripUpdateStatus', updateTripStatus)
router.get('/getAllTripdetails', getAllTrips)

module.exports = router;
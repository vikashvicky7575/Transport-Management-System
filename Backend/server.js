require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//vehicleRoutes
const vehicleRoutes = require("./routes/vehicleroutes");
//driverRoutes
const driverRoutes = require("./routes/driverRoutes");
//authRoutes
const authRoutes = require("./routes/authRoutes");
//tripRoutes
const tripRoutes = require("./routes/tripRoutes");
//mainteancesRoutes
const maintenanceRoutes = require("./routes/mainteancesRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
//vehicle routes post and get for vehicle details
app.use("/api/vehicles", vehicleRoutes);
//Driver routes post for Driver details
app.use("/api/drivers", driverRoutes);
//auth Routes for login & signup
app.use("/api/auth", authRoutes);
//trip Routes
app.use("/api/tripSchedule", tripRoutes);
//mainteances Routes
app.use("/api/mainteances", maintenanceRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

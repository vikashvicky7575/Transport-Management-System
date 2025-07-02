import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRequest } from "../../../../Redux/Slice/dashboardSlice";
import CountUp from "react-countup";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import styles from "./DispatcherDashboard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

const DispatcherDashboard = () => {
  const dispatch = useDispatch();

  const {
    onTripVehicles = [],
    availableDrivers = [],
    availableVehicles = [],
    maintenanceVehicles = [],
    loading,
    error,
  } = useSelector((state) => state.dashboardStore);

  useEffect(() => {
    dispatch(fetchDashboardRequest());
  }, [dispatch]);

  const summaryData = [
    { name: "On-Trips", value: onTripVehicles.length, color: "#0d6efd" },
    {
      name: "Available Drivers",
      value: availableDrivers.length,
      color: "#198754",
    },
    {
      name: "Available Vehicles",
      value: availableVehicles.length,
      color: "#ffc107",
    },
    {
      name: "Maintenance",
      value: maintenanceVehicles.length,
      color: "#dc3545",
    },
  ];

  const barData = summaryData.map((item) => ({
    category: item.name,
    count: item.value,
  }));

  // Define totalCount after barData
  const totalCount = barData.reduce((sum, item) => sum + item.count, 0);

  if (loading)
    return (
      <p className="text-center fs-3 text-primary mt-5">Loading dashboard...</p>
    );
  if (error) return <p className="text-center fs-4 text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">🚛 Dispatcher Dashboard</h2>

      <div className="row g-4">
        {summaryData.map((item, idx) => (
          <div key={idx} className="col-md-3">
            <div
              className="card shadow border-start border-4"
              style={{ borderColor: item.color }}
            >
              <div className="card-body text-center">
                <h5 className="card-title text-secondary">{item.name}</h5>
                <h2 className="display-6 fw-bold" style={{ color: item.color }}>
                  <CountUp end={item.value} duration={1.5} />
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5 g-4">
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-center text-primary">
              Vehicle Status Overview
            </h5>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={summaryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {summaryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-center text-primary">Entity Counts</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                barCategoryGap="20%"
              >
                <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  formatter={(value) =>
                    `${value} (${Math.round((value / totalCount) * 100)}%)`
                  }
                />

                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                  label={{
                    position: "top",
                    fill: "#111",
                    fontSize: 12,
                    formatter: (value) =>
                      `${Math.round((value / totalCount) * 100)}%`,
                  }}
                >
                  {barData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatcherDashboard;


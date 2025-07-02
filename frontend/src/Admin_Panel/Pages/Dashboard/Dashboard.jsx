import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAdminDashboardRequest } from "../../../Redux/Slice/adminDashboardSlice";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import CountUp from "react-countup";
import styles from "./Dashboard.module.css"; // 👈 Create this CSS module

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8e44ad"];

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    totalvehicles,
    totalDriver,
    activeTrips,
    bookingHistory,
    loading,
    error,
  } = useSelector((state) => state.adminDashboardStore);

  useEffect(() => {
    dispatch(fetchAdminDashboardRequest());
  }, [dispatch]);

  const data = [
    { label: "Vehicles", count: totalvehicles.length },
    { label: "Drivers", count: totalDriver.length },
    { label: "Active Trips", count: activeTrips.length },
    { label: "Bookings", count: bookingHistory.length },
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>Admin Transport Dashboard</h2>

      {loading ? (
        <p className="text-primary text-center fs-4">Loading...</p>
      ) : error ? (
        <p className="text-danger text-center fs-5">{error}</p>
      ) : (
        <>
          {/* Top Cards */}
          <div className={styles.statsGrid}>
            {data.map((item, idx) => (
              <div key={idx} className={styles.card}>
                <h3>Total {item.label}</h3>
                <p>
                  <CountUp end={item.count} duration={1.5} />
                </p>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className={styles.chartGrid}>
            {/* Pie Chart */}
            <div className={styles.chartCard}>
              <h4 className={styles.chartTitle}>Pie Chart</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`pie-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}
            <div className={styles.chartCard}>
              <h4 className={styles.chartTitle}>Bar Chart</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) =>
                      `${value} (${Math.round((value / total) * 100)}%)`
                    }
                  />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    label={({ x, y, width, value, index }) => {
                      const percent = Math.round((value / total) * 100);
                      return (
                        <text
                          x={x + width / 2}
                          y={y - 10}
                          className={styles.barLabel}
                        >
                          {`${data[index].label}: `}
                          <tspan className={styles.countup}>
                            <CountUp end={value} duration={1.2} />
                          </tspan>{" "}
                          ({percent}%)
                        </text>
                      );
                    }}
                  >
                    {data.map((_, index) => (
                      <Cell
                        key={`bar-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;





import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axiosInstance from "../../axios/axios";

function getStyle(styleVariable) {
  return "#000000";
}

function MonthlyChart() {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    bookings: 0,
    totalCars: 0,
    monthlyRevenue: 0,
    total_vendor: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/chart/");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const monthlyData = Array.isArray(dashboardData.monthlyRevenue)
    ? dashboardData.monthlyRevenue
    : [dashboardData.monthlyRevenue];

  return (
    <div
      className="bg-slate-300 mt-10 p-4 rounded-md"
      style={{ display: "flex" }}
    >
      <div className="chart-container" style={{ flex: 1, marginRight: "10px" }}>
        <CChart
          type="bar"
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
            datasets: [
              {
                label: "Monthly Revenue",
                backgroundColor: "#f87979",
                data: monthlyData,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
              y: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default MonthlyChart;

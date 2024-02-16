import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axiosInstance from "../../axios/axios";

function PieChartAdmin() {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/pie-chart-data/");
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className="chart-container mx-20 h-[390px] w-[390px] mt-10"
        style={{ flex: 2 }}
      >
        <CChart
          type="doughnut"
          data={{
            labels: chartData.labels,
            datasets: [
              {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                data: chartData.data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "#ffffff",
                },
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default PieChartAdmin;

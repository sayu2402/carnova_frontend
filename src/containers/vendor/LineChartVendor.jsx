import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axiosInstance from "../../axios/axios";

const LineChartVendor = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Monthly Revenue",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("api/vendor/chart/44");
        console.log("response", response);
        const data = response.data;

        const monthlySeries = data.monthlyRevenue.map((item) => item.revenue);
        const categories = data.monthlyRevenue.map((item) => item.month);

        console.log("monthly series", monthlySeries);

        setChartData({
          series: [{ name: "Monthly Revenue", data: monthlySeries }],
          options: {
            ...chartData.options,
            xaxis: {
              categories,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChartVendor;

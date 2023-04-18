import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";

Chart.register(CategoryScale, LinearScale);
import { Line } from "react-chartjs-2";
import styles from "../../../styles/weightgrafic.module.css";

const WeightGraph = () => {
  const [weightRecords, setWeightRecords] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const weightRecords = user?.weekTracker.reduce((acc, week) => {
      return acc.concat(week.weightRecords);
    }, []);
    console.log("weightRecords:", weightRecords);
    setWeightRecords(weightRecords);
  }, []);
  console.log("weightRecords:", weightRecords);

  useEffect(() => {
    const chart = () => {
      const dates = weightRecords.map((record) => record.date);
      console.log("dates:", dates);
      const weights = weightRecords.map((record) => parseFloat(record.weight));
      console.log("weights:", weights);
      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Weight",
            data: weights,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      });
    };
    chart();
  }, [weightRecords]);

  return (
    <div className={styles.container}>
      {/* <h1>Weight Graph</h1> */}
      <div className={styles.graph}>
        {chartData.datasets && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Weight over Time", display: true },
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
                y: {
                  type: "linear",
                  title: {
                    display: true,
                    text: "Weight (lbs)",
                  },
                  ticks: {
                    beginAtZero: true,
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WeightGraph;

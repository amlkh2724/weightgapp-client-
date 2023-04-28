
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "../../../styles/weightgrafic.module.css";

Chart.register(CategoryScale, LinearScale);

const WeightGraph = () => {
  const [weightRecords, setWeightRecords] = useState([]);
  const [chartData, setChartData] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Fetch weight records from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const weightRecords = user?.weekTracker.reduce((acc, week) => {
      return acc.concat(week.weightRecords);
    }, []);
    setWeightRecords(weightRecords);
  }, []);

  useEffect(() => {
    const chart = () => {
      // Extract dates and weights from weightRecords
      const dates = weightRecords.map((record) => record.date);
      const weights = weightRecords.map((record) => parseFloat(record.weight));

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

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkmodee : styles.lightmode}`}>
      <div className={styles.switchContainer}>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleDarkModeToggle} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
        <div>{isDarkMode ? styles.darkmode : styles.lightmode}</div>
      </div>
      <div className={isDarkMode ? styles.blackit : styles.graph}>
        {chartData.datasets && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, 
              plugins: {
                legend: {
                  display: false, 
                },
              },
              scales: {
                x: {
                  type: "category",
                  title: {
                    display: true,
                    text: "Date",
                  },
                  ticks: {
                    color: isDarkMode ? "#000" : "#000", 
                  },
                },
                y: {
                  type: "linear",
                  title: {
                    display: true,
                    text: "Weight (kg)",
                  },
                  ticks: {
                    beginAtZero: true,
                    color: isDarkMode ? "#000" : "#000", 
                  },
                  grid: {
                    color: isDarkMode ? "#000" : "#000", 
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



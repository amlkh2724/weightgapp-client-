import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/weeklyweight.module.css";
import TotalWeight from "@/pages/components/totalweighteachweek/totalWeight";

const WeightRecords = () => {
  const [weightRecords, setWeightRecords] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://tame-tan-binturong-belt.cyclic.app/users/userbyid/${user.id}`
        );
        const length = user.weekTracker.length - 1;
        const { weightRecords } = user.weekTracker[length];
        setWeightRecords(weightRecords);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
    console.log("weightRecords",weightRecords);
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.darkmode : styles.lightmode
      }`}
    >
      <div className={styles.switchContainer}>
        <label className={styles.switch}>
          <input type="checkbox" onChange={handleDarkModeToggle} />
          <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
      </div>
      <TotalWeight weightRecords={weightRecords} />
      <table
        className={`${styles.table} ${isDarkMode ? styles.tableDark : ""}`}
      >
        <thead>
          <tr className={isDarkMode ? styles.black : ""}>
            <th>Date</th>
            <th>Weight (kg)</th>
            <th>Day</th>
          </tr>
        </thead>
        <tbody>
          {weightRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{`${record.weight} kg`}</td>
              <td>{record.day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default WeightRecords;

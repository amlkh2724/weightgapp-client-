import React, { useState, useEffect } from "react";
import styles from "../../../styles/HisoryWeeksCard.module.css"

const HistoryWeeks = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"))
        setUserData(getIdFromLocalStorage.weeksHistory);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className={styles.historyTable}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Day</th>
          <th>Total Average on Week Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        {userData &&
          userData.map((data, index) => (
            <tr key={index}>
              <td className={styles.date}>{data.date}</td>
              <td className={styles.day}>{data.day}</td>
              <td className={styles.totalAverage}>
                {data.totalAverageOnWeekGainOrLoss}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default HistoryWeeks;

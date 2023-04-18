import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../styles/weeklyweight.module.css";
import TotalWeight from "@/pages/components/totalweighteachweek/totalWeight";

const WeightRecords = () => {
  const [weightRecords, setWeightRecords] = useState([]);

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
  }, []);

  return (
    <div className={styles.container}>
      <TotalWeight weightRecords={weightRecords} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight (kg)</th>
            <th>day</th>
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

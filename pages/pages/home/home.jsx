import React from "react";
import { useEffect } from "react";
import Model from "@/pages/components/model/model";
import styles from '../../../styles/ModelOptionFood.module.css'
const Home = () => {
  const [username, setUsername] = React.useState("");
  useEffect(() => {
    const today = new Date();
    const isSunday = JSON.parse(localStorage.getItem("isSunday"));
    if (isSunday.i > 0) {
      if (today.getDay() === 0) {
        isSunday.isSunday = true;
      } else {
        isSunday.isSunday = false;
      }
    } else {
      isSunday.i = 0;
    }
  }, []);
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  }, []);

  return (
    <div>
      <h1 className={styles.centerName}>Welcome, {username}</h1>
      <Model></Model>
    </div>
  );
};

export default Home;

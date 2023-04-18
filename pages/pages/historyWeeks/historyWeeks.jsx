import React, { useState, useEffect } from "react";
// import axios from "axios";
import styles from "../../../styles/HisoryWeeksCard.module.css"

const HistoryWeeks = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        // const response = await axios.get(
        //   `https://tame-tan-binturong-belt.cyclic.app/users/userbyid/${getIdFromLocalStorage.id}`
        // );
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



// import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { AppContext } from "@/pages/context/appProvider";
// import styles from "../../../styles/HisoryWeeksCard.module.css";


// const HistoryWeeks = () => {
//   const { setGoal, setGoall } = useContext(AppContext);
//   // const [goal, setGoal] = useState()
//   const [userData, setUserData] = useState(null);
//   const [latestWeek, setLatestWeek] = useState(null);
//   const [upOrDown, setUpOrDown] = useState()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
//         setUserData(getIdFromLocalStorage.weeksHistory);
//         const getGoal = getIdFromLocalStorage.setGoal;
//         setGoall(getGoal)
//         setUpOrDown(getIdFromLocalStorage.weeksHistory[getIdFromLocalStorage.weeksHistory.length - 1].upOrDown)
//         if (getGoal === "gainWeight") {
//           const latestWeekData = getIdFromLocalStorage.weeksHistory[getIdFromLocalStorage.weeksHistory.length - 1];
//           setLatestWeek(latestWeekData);
//         } else {
//           setLatestWeek(null);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getClassName = (data) => {
//     const isGainWeight = setGoal === "gainWeight";
//     const isUp = upOrDown === "up";

//     if (userData && data === latestWeek && isGainWeight && isUp) {
//       return styles.latestWeekGain;
//     } else if (userData && data === latestWeek) {
//       return styles.latestWeekLoss;
//     } else if (userData && isGainWeight && data.upOrDown === "up") {
//       return styles.weekGain;
//     } else if (userData && isGainWeight && data.upOrDown === "down") {
//       return styles.weekLoss;
//     } else {
//       return styles.weekNormal;
//     }
//   };

//   return (
//     <table className={styles.historyTable}>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Day</th>
//           <th> Week Gain/Loss</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userData &&
//           userData.map((data, index) => (
//             <tr key={index}>
//               <td className={styles.date}>{data.date}</td>
//               <td className={styles.day}>{data.day}</td>
//               <td className={getClassName(data)}>
//                 {`${data.totalAverageOnWeekGainOrLoss} kg`}
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// };

// export default HistoryWeeks;

// import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { AppContext } from "@/pages/context/appProvider";
// import styles from "../../../styles/HisoryWeeksCard.module.css";

// const HistoryWeeks = () => {
//   const { setGoals, chooseGainWeight } = useContext(AppContext);
//   const [goal, setGoal] = useState()
//   const [userData, setUserData] = useState(null);
//   const [latestWeek, setLatestWeek] = useState(null);
//   const [upOrDown, setUpOrDown] = useState()

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
//         setUserData(getIdFromLocalStorage.weeksHistory);
//         const getGoal = getIdFromLocalStorage.setGoal;
//         setGoal(getGoal)
//         setUpOrDown(getIdFromLocalStorage.weeksHistory[getIdFromLocalStorage.weeksHistory.length - 1].upOrDown)
//         if (getGoal === "gainWeight") {
//           const latestWeekData = getIdFromLocalStorage.weeksHistory[getIdFromLocalStorage.weeksHistory.length - 1];
//           setLatestWeek(latestWeekData);
//         } else {
//           setLatestWeek(null);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const getClassName = (data) => {
//     // if (latestWeek && data === latestWeek) {
//       if(data === latestWeek){
//         if (goal === "gainWeight" && upOrDown === 'up') {
//           return styles.latestWeekGain;
//         } else {
//           return styles.latestWeekLoss;
//         }
//       }
     
//     // } 
//   };
  
  
//   return (
//     <table className={styles.historyTable}>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Day</th>
//           <th> Week Gain/Loss</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userData &&
//           userData.map((data, index) => (
//             <tr key={index}>
//               <td className={styles.date}>{data.date}</td>
//               <td className={styles.day}>{data.day}</td>
//               <td className={getClassName(data)}>
//                 {`${data.totalAverageOnWeekGainOrLoss} kg`}
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// };

// export default HistoryWeeks;
             
// import React, { useState, useEffect } from "react";
// import { useContext } from "react";
// import { AppContext } from "@/pages/context/appProvider";
// import styles from "../../../styles/HisoryWeeksCard.module.css";

// const HistoryWeeks = () => {
//   const { setGoal, chooseGainWeight } = useContext(AppContext);
//   const [userData, setUserData] = useState(null);
//   const [className, setClassName] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const getIdFromLocalStorage = JSON.parse(localStorage.getItem("user"));
//         const weeksHistory = getIdFromLocalStorage.weeksHistory;
//         setUserData(weeksHistory);
//         let hasUp = false;
//         for (let i = 0; i < weeksHistory.length; i++) {
//           if (weeksHistory[i].upOrDown === "up") {
//           setClassName(styles.green);
//         // hasUp = true;
//           }else{
//             setClassName(styles.red);

//           }
//         }
//         // const getGoal = getIdFromLocalStorage.setGoal;
//         // if (getGoal === "gainWeight" && hasUp) {
//         //   setClassName(styles.green);
//         // } else {
//         //   setClassName(styles.red);
//         // }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [chooseGainWeight]);

//   return (
//     <table className={styles.historyTable}>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Day</th>
//           <th>Total Average on Week Gain/Loss</th>
//         </tr>
//       </thead>
//       <tbody>
//         {userData &&
//           userData.map((data, index) => (
//             <tr key={index}>
//               <td className={styles.date}>{data.date}</td>
//               <td className={styles.day}>{data.day}</td>
//               <td className={className}>
//                 {data.totalAverageOnWeekGainOrLoss}
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );
// };
// export default HistoryWeeks;









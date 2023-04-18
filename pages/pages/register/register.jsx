import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/Register.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "@/pages/context/appProvider";
import Link from "next/link";
const RegisterPage = () => {
  const { setGoal, setGoall } = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleGoalChange = (e) => {
    setGoall(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://tame-tan-binturong-belt.cyclic.app/users/register",
        { username, password, email, gender, weight, height, setGoal }
      );
      console.log(res.data);
      // Redirect to LoginPage on successful registration
      router.push("/pages/login/login");
      // Perform different action based on selected gender
      if (gender === "male") {
        console.log("User selected male");
      } else if (gender === "female") {
        console.log("User selected female");
      }
      if (setGoal === "gainWeight") {
        console.log("User selected gainWeight");
      } else if (setGoal === "lostWeight") {
        console.log("User selected lostWegiht");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className={styles.allSignUp}>
      <div className={styles.container}>
        <div className={styles.mobileDes}>
          <div className={styles.backgroundRegister}>
            {/* <div> */}
            <Link href="/pages/login/login">
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: "#000000", width: "4rem" }}
                className="fa-fade"
              />
            </Link>
            {/* </div> */}
          </div>
          <div className={styles.controltocenter}>
            <form onSubmit={handleSubmit}>
              <label>
                <span className={styles.displaynoneit}>Username:</span>
                <input
                  className={styles.fixiii}
                  type="text"
                  value={username}
                  placeholder="Name"
                  onChange={handleUsernameChange}
                />
              </label>
              <label>
                <span className={styles.displaynoneit}>Password:</span>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your Password"
                  onChange={handlePasswordChange}
                />
              </label>
              <label>
                <span className={styles.displaynoneit}>Email:</span>
                <input
                  type="email"
                  value={email}
                  placeholder="Email id"
                  onChange={handleEmailChange}
                />
              </label>
              <label>
                <span className={styles.displaynoneit}>Gender:</span>
                <select
                  className={styles.gender}
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                <span className={styles.displaynoneit}>yourGoal:</span>
                <select
                  className={styles.gender}
                  value={setGoal}
                  onChange={handleGoalChange}
                >
                  <option value="">Select Goal</option>
                  <option value="gainWeight">gainWeigh</option>
                  <option value="lostWeight">lostWeight</option>
                </select>
              </label>
              <label>
                <span className={styles.displaynoneit}>Weight:</span>
                <input
                  type="text"
                  value={weight}
                  placeholder="Enter your Weight"
                  onChange={handleWeightChange}
                />
              </label>
              <label>
                <span className={styles.displaynoneit}>Height:</span>
                <input
                  type="text"
                  value={height}
                  placeholder="Enter your Height"
                  onChange={handleHeightChange}
                />
              </label>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

// import { useContext } from "react";
// import { AppContext } from "@/pages/context/appProvider";
// import { useEffect } from "react";
// import axios from "axios";
// const Updatelocalstorge = () => {
//   const { totalAverageOnWeekGainOrLoss } = useContext(AppContext);

//   useEffect(() => {
//     const today = new Date();
//     const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
//     let formattedDate = today.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     // Retrieve existing user data from local storage
//     const userJson = localStorage.getItem("user");
//     const user = JSON.parse(userJson);

//     // If there is no existing user data, create a new user object with the new week
//     if (!user) {
//       const newUserData = {
//         weeksHistory: [
//           {
//             date: formattedDate,
//             day: dayOfWeek,
//             totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
//           },
//         ],
//       };
//       localStorage.setItem("user", JSON.stringify(newUserData));
//       return;
//     }

//     // Retrieve existing weeks data from user data
//     const allWeeks = user.weeksHistory;

//     // Find the index of the last week in the array
//     const lastWeekIndex = allWeeks.length - 1;

//     // Check if there are any existing weeks
//     if (lastWeekIndex < 0) {
//       // If there are no existing weeks, add a new week to the array
//       formattedDate = today.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });

//       // Create a new week's data object
//       const newWeekData = {
//         date: formattedDate,
//         day: dayOfWeek,
//         totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
//       };

//       // Add the new week's data to the allWeeks array
//       allWeeks.push(newWeekData);

//       // Update the user data with the updated weeks data
//       user.weeksHistory = allWeeks;

//       // Save the updated data to local storage
//       localStorage.setItem("user", JSON.stringify(user));
//       return;
//     }

//     // Check if the last week's date is the same as today's date
//     const lastWeek = allWeeks[lastWeekIndex];
//     if (lastWeek && lastWeek.date) {
//       const lastWeekDate = new Date(lastWeek.date);
//       const isSameWeek =
//         lastWeekDate.getFullYear() === today.getFullYear() &&
//         lastWeekDate.getMonth() === today.getMonth() &&
//         lastWeekDate.getDate() >= today.getDate() - today.getDay();

//       // If the last week's date is the same as today's date, update the last entry instead of adding a new one
//       if (isSameWeek) {
//         const updatedLastWeek = {
//           ...lastWeek,
//           totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
//           date: formattedDate,
//           day: dayOfWeek,
//         };

//         // Create a copy of the allWeeks array and replace the last week's data with the updated data
//         const updatedWeeksData = [
//           ...allWeeks.slice(0, lastWeekIndex),
//           updatedLastWeek,
//           ...allWeeks.slice(lastWeekIndex + 1),
//         ];
//         // Update the user data with the updated weeks data
//         user.weeksHistory = updatedWeeksData;

//         // Save the updated data to local storage
//         localStorage.setItem("user", JSON.stringify(user));
//         return;
//       }
//     }

//    // If the last week's date is not the same as today's date, add a new week's data
// formattedDate = today.toLocaleDateString("en-US", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });

// // Create a new week's data object
// const newWeekData = {
//   date: formattedDate,
//   day: dayOfWeek,
//   totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
// };

// // If there is at least one existing week, copy the totalAverageOnWeekGainOrLoss value from the last week
// if (lastWeekIndex >= 0) {
//   newWeekData.totalAverageOnWeekGainOrLoss = allWeeks[lastWeekIndex].totalAverageOnWeekGainOrLoss;
// }

// // Add the new week's data to the allWeeks array
// allWeeks.push(newWeekData);

// // Update the user data with the updated weeks data
// user.weeksHistory = allWeeks;

// // Save the updated data to local storage
// localStorage.setItem("user", JSON.stringify(user));

//            const res = async () => {
//               const updatedUser = await axios.put(
//                 `https://tame-tan-binturong-belt.cyclic.app/users/weightRecords/${user.id}`,
//                 user
//               );
//               console.log("Updated user:", updatedUser);
//             };
//             res()
//   }, [totalAverageOnWeekGainOrLoss]);
//   return null;
// };

// export default Updatelocalstorge;

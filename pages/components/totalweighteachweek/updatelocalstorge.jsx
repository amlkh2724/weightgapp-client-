import { useContext } from "react";
import { AppContext } from "@/pages/context/appProvider";
import { useEffect } from "react";
import axios from "axios";
const Updatelocalstorge = () => {
  const { totalAverageOnWeekGainOrLoss, setTotalAverageOnWeekGainOrLoss } =
    useContext(AppContext);
  // setTotalAverageOnWeekGainOrLoss(JSON.parse(user));
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
    let formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    // setTotalAverageOnWeekGainOrLoss(
    //   allWeeks[lastWeekIndex].totalAverageOnWeekGainOrLoss
    // );
    // Retrieve existing user data from local storage
    const userJson = localStorage.getItem("user");
    const user = JSON.parse(userJson);
    // const weekHistoryLength = user.weeksHistory.length;
    // if (weekHistoryLength > 1) {
    //   setTotalAverageOnWeekGainOrLoss(
    //     const getprev=
    //     JSON.parse(
    //       localStorage.getItem(user.weeksHistory[user.weeksHistory.length - 1])
    //     )
    //   );
    // }
// console.log(totalAverageOnWeekGainOrLoss);

    // console.log(
    //   "weekcurrent:",
    //   user.weeksHistory[user.weeksHistory.length - 2]
    // );
    console.log("totalAverageOnWeekGainOrLoss:", totalAverageOnWeekGainOrLoss);
    // If there is no existing user data, create a new user object with the new week
    if (!user) {
      const newUserData = {
        weeksHistory: [
          {
            date: formattedDate,
            day: dayOfWeek,
            totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
          },
        ],
      };
      localStorage.setItem("user", JSON.stringify(newUserData));
      return;
    }

    // Retrieve existing weeks data from user data
    const allWeeks = user.weeksHistory;

    // Find the index of the last week in the array
    const lastWeekIndex = allWeeks.length - 1;

    // Check if there are any existing weeks
    if (lastWeekIndex < 0) {
      // If there are no existing weeks, add a new week to the array
      formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Create a new week's data object
      const newWeekData = {
        date: formattedDate,
        day: dayOfWeek,
        totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
      };

      // Add the new week's data to the allWeeks array
      allWeeks.push(newWeekData);

      // Update the user data with the updated weeks data
      user.weeksHistory = allWeeks;

      // Save the updated data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      return;
    }

    // Check if the last week's date is the same as today's date
    const lastWeek = allWeeks[lastWeekIndex];
    if (lastWeek && lastWeek.date) {
      const lastWeekDate = new Date(lastWeek.date);
      const isSameWeek =
        lastWeekDate.getFullYear() === today.getFullYear() &&
        lastWeekDate.getMonth() === today.getMonth() &&
        lastWeekDate.getDate() >= today.getDate() - today.getDay();

      // If the last week's date is the same as today's date, update the last entry instead of adding a new one
      if (isSameWeek) {
        const weightArr = user.weekHistory;
        console.log("weightArr", weightArr);
        console.log("totalAverageOnWeekGainOrLoss:a", totalAverageOnWeekGainOrLoss);

        // const lastWeight = user.weeksHistory[user.weeksHistory.length -2].totalAverageOnWeekGainOrLoss
        const updatedLastWeek = {
          ...lastWeek,
          totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
          date: formattedDate,
          day: dayOfWeek,
        };

        // Create a copy of the allWeeks array and replace the last week's data with the updated data
        const updatedWeeksData = [
          ...allWeeks.slice(0, lastWeekIndex),
          updatedLastWeek,
          ...allWeeks.slice(lastWeekIndex + 1),
        ];
        // Update the user data with the updated weeks data`
        user.weeksHistory = updatedWeeksData;

        // Save the updated data to local storage
        localStorage.setItem("user", JSON.stringify(user));
        return;
      }
    }

    // If the last week's date is not the same as today's date, add a new week's data
    formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log("totalAverageOnWeekGainOrLoss::", totalAverageOnWeekGainOrLoss);
    // Create a new week's data object
    const newWeekData = {
      date: formattedDate,
      day: dayOfWeek,
      totalAverageOnWeekGainOrLoss: totalAverageOnWeekGainOrLoss,
    };

    // If there is at least one existing week, copy the totalAverageOnWeekGainOrLoss value from the last week
    if (lastWeekIndex) {
      newWeekData.totalAverageOnWeekGainOrLoss =
        allWeeks[lastWeekIndex].totalAverageOnWeekGainOrLoss;
    }

    // Add the new week's data to the allWeeks array
    allWeeks.push(newWeekData);

    // Update the user data with the updated weeks data
    user.weeksHistory = allWeeks;

    // Save the updated data to local storage
    localStorage.setItem("user", JSON.stringify(user));

    const res = async () => {
      const updatedUser = await axios.put(
        `https://tame-tan-binturong-belt.cyclic.app/users/weightRecords/${user.id}`,
        user
      );
      console.log("Updated user:", updatedUser);
    };
    res();
  }, [totalAverageOnWeekGainOrLoss]);
  return null;
};

export default Updatelocalstorge;

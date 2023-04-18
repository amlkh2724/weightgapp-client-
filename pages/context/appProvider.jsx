import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [weight, setWeight] = useState("");
  const [totalCalories, setTotalCalories] = useState("");
  const [weekIndex, setWeekIndex] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [lastWieghtCurrent, setLastWieghtCurrent] = useState(null);
  const [LastLastWieghtCurrent, setLastLastWieghtCurrent] = useState(0);
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [calories, setCalories] = useState({});
  const [getAllWeeks, setAllWeeks] = useState([]);
  const [chooseGainWeight, setGainWeight] = useState("false");
  const [setGoal, setGoall] = useState("");

  const [isclick, setisclick] = useState(false);

  const [totalAverageOnWeekGainOrLoss, setTotalAverageOnWeekGainOrLoss] = useState(0);

  const [options, setOptions] = useState({
    breakfast: [
      { label: "Eggs", value: "eggs" },
      { label: "Cereal", value: "cereal" },
      { label: "Pancakes", value: "pancakes" },
    ],
    lunch: [
      { label: "Sandwich", value: "sandwich" },
      { label: "Salad", value: "salad" },
      { label: "Pizza", value: "pizza" },
    ],
    dinner: [
      { label: "Steak", value: "steak" },
      { label: "Fish", value: "fish" },
      { label: "Chicken", value: "chicken" },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("indexweek", weekIndex);

      const today = new Date();
      if (today.getDay() === 0) {
        setWeekIndex((prevWeekIndex) => prevWeekIndex + 1);
      }
    }, 86400000); // Check once every day

    return () => clearInterval(interval);
  }, []);
  return (
    <AppContext.Provider
      value={{
        weight,
        setWeight,
        totalCalories,
        setTotalCalories,
        weekIndex,
        setWeekIndex,
        totalWeight,
        setTotalWeight,
        setLastWieghtCurrent,
        lastWieghtCurrent,
        setLastLastWieghtCurrent,
        LastLastWieghtCurrent,
        breakfast,
        setBreakfast,
        lunch,
        setLunch,
        dinner,
        setDinner,
        calories,
        setCalories,
        options,
        setOptions,
        setAllWeeks,
        getAllWeeks,
        setTotalAverageOnWeekGainOrLoss,
        totalAverageOnWeekGainOrLoss,
        isclick,
        setisclick,
        setGoal,
        setGoall,
        chooseGainWeight,
        setGainWeight,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

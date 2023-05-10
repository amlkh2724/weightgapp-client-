import { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "@/pages/context/appProvider";
import styles from "../../../styles/ModelOptionFood.module.css";
import { useState } from "react";
import axios from "axios";
const Model = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    weight,
    setWeight,
    setTotalCalories,
    totalCalories,
    breakfast,
    setBreakfast,
    lunch,
    setLunch,
    dinner,
    setDinner,
    calories,
    setCalories,
    options,
  } = useContext(AppContext);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (weight <= 0) {
      setErrorMessage("Please enter a positive number for weight!");
      return;
    }
    if (!breakfast && !lunch && !dinner) {
      router.push("/pages/weeklytracker/weeklyweight");
    } else if (breakfast && lunch && dinner) {
      console.log(
        `Weight: ${weight}, Breakfast: ${breakfast}, Lunch: ${lunch}, Dinner: ${dinner}`
      );
      router.push("/pages/weeklytracker/weeklyweight");
    } else {
      setErrorMessage("Please fill in all meals!");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const today = new Date();

    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );

    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 7)
    );

    const isSunday = JSON.parse(localStorage.getItem("isSunday"));
    if (isSunday.isSunday) {
      isSunday.i = Number(isSunday.i) + 1;
    }
    const weekObj = user.weekTracker[isSunday.i];
    localStorage.setItem("isSunday", JSON.stringify(isSunday));
    if (!weekObj) {
      // if week object doesn't exist, add a new object to weekTracker
      user.weekTracker.push({
        startDate: startOfWeek.toLocaleDateString(),
        endDate: endOfWeek.toLocaleDateString(),
        weightRecords: [
          {
            date: new Date().toLocaleDateString(),
            day: new Date()
              .toLocaleString("en-US", { weekday: "long" })
              .toLowerCase(),
            weight: weight,
            average: 0,
          },
        ],
      });
    } else {
      // week exists, update existing object
      weekObj.weightRecords.push({
        date: new Date().toLocaleDateString(),
        day: new Date()
          .toLocaleString("en-US", { weekday: "long" })
          .toLowerCase(),

        weight: weight,
        average: 0,
      });
    }

    localStorage.setItem("user", JSON.stringify(user));
    const response = await axios.put(
      `https://tame-tan-binturong-belt.cyclic.app/users/weightRecords/${user.id}`,
      user
    );
    console.log("db user:", response);
  };
  const handleOptionChange = (e, meal) => {
    const { value } = e.target;
    const selectedOption = options[meal].find(
      (option) => option.value === value
    );
    let query = selectedOption.label;
    console.log("the querty is:", query);
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/nutrition?query=" + query,
      headers: { "X-Api-Key": "Ia4/pPBk5shq/5Fyxuow6g==tBXT7XWdgZtf9kkW" },
      contentType: "application/json",
      success: function (result) {
        console.log(result[0].calories);
        // update state with calorie information
        const updatedCalories = { ...calories, [meal]: result[0].calories };
        setCalories(updatedCalories);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });

    // update state based on selected option
    switch (meal) {
      case "breakfast":
        setBreakfast(selectedOption.label);
        break;
      case "lunch":
        setLunch(selectedOption.label);
        break;
      case "dinner":
        setDinner(selectedOption.label);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setTotalCalories(
      Number(
        (
          (calories.breakfast || 0) +
          (calories.lunch || 0) +
          (calories.dinner || 0)
        ).toFixed(2)
      )
    );
  }, [calories]);
  return (
    <div className={styles.containerr}>
      <div className={styles.centeritmodel}>
        <div className={styles.borderit}>
          <h2>Weight Tracker</h2>
          <h5 className={styles.red}>{errorMessage}</h5>
          <form onSubmit={handleSubmit}>
            <label>
              Weight:
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </label>
            <br />
            <label>
              Breakfast:
              <select
                value={breakfast}
                onChange={(e) => handleOptionChange(e, "breakfast")}
              >
                <option value="">{breakfast || "Choose an option"}</option>
                {options.breakfast.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {calories.breakfast && (
                <span>{`${calories.breakfast} calorie`}</span>
              )}
            </label>
            <br />
            <label>
              Lunch:
              <select
                value={lunch}
                onChange={(e) => handleOptionChange(e, "lunch")}
              >
                <option value="">{lunch || "Choose an option"}</option>
                {options.lunch.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {calories.lunch && <span>{`${calories.lunch} calorie`}</span>}
            </label>
            <br />
            <label>
              Dinner:
              <select
                value={dinner}
                onChange={(e) => handleOptionChange(e, "dinner")}
              >
                <option value="">{dinner || "Choose an option"}</option>
                {options.dinner.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {calories.dinner && <span>{`${calories.dinner} calorie`}</span>}
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
          <p className={styles.total}>{`Total:${totalCalories} calories`}</p>
        </div>
      </div>
    </div>
  );
};
export default Model;

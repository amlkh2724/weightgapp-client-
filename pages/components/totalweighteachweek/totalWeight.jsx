import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "@/pages/context/appProvider";
import styles from "../../../styles/TotalWeight.module.css";
import Updatelocalstorge from "./updatelocalstorge";
const TotalWeight = ({ weightRecords }) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [countDays, setCountDays] = useState(0);
  const [averageWeight, setAverageWeight] = useState(0);
  const [isSaturday, setIsSaturday] = useState(false);
  const [firstWeek, setFirstWeek] = useState(false);
  const [isUp, setIsUp] = useState(false);
  const [checklossOrGain, setCheckLossOrGain] = useState(false);
  const {
    setLastWieghtCurrent,
    setTotalAverageOnWeekGainOrLoss,
    totalAverageOnWeekGainOrLoss,
    setGainWeight,
  } = useContext(AppContext);

  useEffect(() => {
    console.log(totalWeight);
    const getGoalLossOrGain = JSON.parse(localStorage.getItem("user"));
    const isGainOrLoss = getGoalLossOrGain.setGoal;
    console.log(isGainOrLoss);
    if (isGainOrLoss === "gainWeight") {
      setCheckLossOrGain(true);
    } else {
      setCheckLossOrGain(false);
    }
    const today = new Date();
    if (today.getDay() === 6) {
      setIsSaturday(true);
    } else {
      setIsSaturday(false);
    }
    const dayOfWeek = today.getDay();
    const daysFromSaturday = dayOfWeek >= 6 ? dayOfWeek - 6 : dayOfWeek + 1;
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - daysFromSaturday);
    startDate.setHours(0, 0, 0, 0);
    // Check if weightRecords array exists before filtering it
    const recordsForWeek = weightRecords
      ? weightRecords.filter((record) => new Date(record.date) >= startDate)
      : [];
    const weekWeight = weightRecords.reduce(
      (acc, record) => acc + parseFloat(record.weight),
      0
    );

    // Calculate average only if recordsForWeek has a length greater than zero
    const currentAverageWeight =
      weightRecords.length > 0 ? weekWeight / weightRecords.length : 0;
    console.log(weightRecords.length);
    // Check if it's the first week

    console.log("weight", weightRecords.length);
    setAverageWeight(currentAverageWeight);

    console.log("currentaver:", Number(currentAverageWeight));
    const trackLossOrGain = JSON.parse(
      localStorage.getItem("weekTrackLossOrGain")
    ) || { isSaturday: false, weekTrackerLossOrGain: 0 };
    if (trackLossOrGain.isSaturday) {
      trackLossOrGain.weekTrackerLossOrGain = Number(currentAverageWeight);
      localStorage.setItem(
        "weekTrackLossOrGain",
        JSON.stringify(trackLossOrGain)
      );
    }

    setTotalWeight(weekWeight);
    setCountDays(weightRecords.length);
  }, [weightRecords]);

  useEffect(() => {
    if (averageWeight) {
      setLastWieghtCurrent(averageWeight);
    }
  }, [averageWeight, setLastWieghtCurrent]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const latestWeekIndex = user.weekTracker.length - 1;

    // Save previous week's weight records
    let prevWeekLatestRecord; // declare the variable without initializing it
    if (latestWeekIndex > 0) {
      const prevWeekIndex = latestWeekIndex - 1;
      const prevWeekWeightRecords =
        user.weekTracker[prevWeekIndex].weightRecords;

      if (prevWeekWeightRecords.length > 0) {
        const prevWeekLatestRecordIndex = prevWeekWeightRecords.length - 1;
        prevWeekLatestRecord = prevWeekWeightRecords[prevWeekLatestRecordIndex];
        prevWeekLatestRecord.average = calculateAverageWeight(
          prevWeekWeightRecords
        );
        console.log("prevWeekLatestRecord", prevWeekLatestRecord.average);
      }
    }

    // Save current week's weight records
    const latestWeightRecordIndex =
      user.weekTracker[latestWeekIndex].weightRecords.length - 1;
    const latestWeightRecord =
      user.weekTracker[latestWeekIndex].weightRecords[latestWeightRecordIndex];
    latestWeightRecord.average = calculateAverageWeight(
      user.weekTracker[latestWeekIndex].weightRecords
    );
    console.log("latestWeightRecord", latestWeightRecord.average);

    localStorage.setItem("user", JSON.stringify(user));
    const res = async () => {
      const getuser = await axios.put(
        `https://tame-tan-binturong-belt.cyclic.app/users/weightRecords/${user.id}`,
        user
      );
      console.log("user:", getuser.data.data);
    };
    res();
    if (
      !prevWeekLatestRecord ||
      (prevWeekLatestRecord.average === null &&
        latestWeightRecord.average === null)
    ) {
      setFirstWeek(false);
    } else {
      const getWeeks = JSON.parse(localStorage.getItem("user"));
      console.log(getWeeks);
      setFirstWeek(true);
      if (latestWeightRecord.average > prevWeekLatestRecord.average) {
        setTotalAverageOnWeekGainOrLoss(
          latestWeightRecord.average - prevWeekLatestRecord.average
        );
        setIsUp(true);
        setGainWeight(true);
        console.log("you up!");
      } else {
        setTotalAverageOnWeekGainOrLoss(
          prevWeekLatestRecord.average - latestWeightRecord.average
        );
        setIsUp(false);
        setGainWeight(false);

        console.log("you down!");
      }
      localStorage.setItem("user", JSON.stringify(getWeeks));
    }
  }, []);

  function calculateAverageWeight(weightRecords) {
    const totalWeight = weightRecords.reduce(
      (sum, record) => sum + parseFloat(record.weight),
      0
    );
    return totalWeight / weightRecords.length;
  }
  return (
    <div className={styles.tableForCheck}>
      <Updatelocalstorge />
      {isSaturday && (
        <table>
          <thead>
            <tr>
              <th>Average weight</th>
              <th>Days count</th>
              <th>{`${isUp ? "you gain" : "you loss"}`}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{`${averageWeight.toFixed(2)} kg`}</td>
              <td>{countDays}</td>
              {firstWeek && (
                <td>
                  {checklossOrGain
                    ? isUp
                      ? " + "
                      : " - "
                    : !checklossOrGain
                    ? isUp
                      ? " - "
                      : " + "
                    : ``}
                  {`${totalAverageOnWeekGainOrLoss.toFixed(2)}kg`}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalWeight;

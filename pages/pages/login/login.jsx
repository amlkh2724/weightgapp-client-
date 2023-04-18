import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import styles from "../../../styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/pages/components/spinner/spinner";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading]=useState(false)
  const router = useRouter();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.post(
        "https://tame-tan-binturong-belt.cyclic.app/users/login",
        {
          email: email,
          password: password,
        }
      );
      const userData = res.data.user;
      console.log("userData:", userData);
      // Save user data in local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("user", JSON.stringify(userData));
      const getlcoa = JSON.parse(localStorage.getItem("user"));
      console.log("getlcoa", getlcoa);

      const weekTracker = getlcoa.weekTracker || [];

      const checkres =
        weekTracker.length > 0
          ? weekTracker[weekTracker.length - 1]
          : undefined;

      if (
        checkres &&
        checkres.weightRecords &&
        checkres.weightRecords.length > 0
      ) {
        const getdate = checkres.weightRecords;
        console.log(getdate.date);
        console.log("getdate:", getdate[getdate.length - 1].date);
      }

      console.log("checkres:", checkres);
      // checkres.weightRecords

      const [day, month, year] = (checkres?.endDate || "0.0.0").split(".");
      const parsedEndDate = new Date(year, month - 1, day);
      console.log("checkres.endDate.newday:", parsedEndDate);

      const todayy = new Date();
      const startOfWeek = new Date(
        todayy.setDate(todayy.getDate() - todayy.getDay() + 1)
      );
      const endOfWeek = new Date(
        todayy.setDate(todayy.getDate() - todayy.getDay() + 7)
      );
      console.log("endweek:", endOfWeek);
      const nextWeek = new Date(endOfWeek);
      nextWeek.setDate(nextWeek.getDate() + 1);
      console.log("startweek:", startOfWeek);
      console.log("endweek:", endOfWeek);
      console.log("nextWeek:", nextWeek);
      console.log("todayy:", todayy);

      if (!checkres || parsedEndDate < startOfWeek) {
        console.log("nextweek!");
        localStorage.setItem(
          "isSunday",
          JSON.stringify({
            user: userData,
            isSunday: true,
            i: weekTracker.length,
          })
        );
      } else {
        console.log("prevweek!");
        localStorage.setItem(
          "isSunday",
          JSON.stringify({
            user: userData,
            isSunday: false,
            i: weekTracker.length > 0 ? weekTracker.length - 1 : 0,
          })
        );
      }

      localStorage.setItem("user", JSON.stringify(userData));

      // Check if user has already added their weight for the day
      const weightRes = await axios.get(
        `https://tame-tan-binturong-belt.cyclic.app/users/userbyid/${userData.id}`
      );
      console.log("informationUser:", weightRes);
      const weightRecords = weightRes.data.data.weekTracker;
      console.log("weektracker:", weightRecords);
      const today = new Date().toLocaleDateString();

      if (weightRecords.length > 0) {
        const lastWeekTracker = weightRecords[weightRecords.length - 1];
        console.log("lastweektracker:", lastWeekTracker);
        const weightRecordsToday = lastWeekTracker.weightRecords.filter(
          (record) => record.date === today
        );
        if (weightRecordsToday.length > 0) {
          // User has already added their weight for the day
          setIsLoading(false)

          router.push("/pages/weeklytracker/weeklyweight");
        } else {
          setIsLoading(false)

          // User has not yet added their weight for the day
          router.push("/pages/home/home");
        }
      } else {
        setIsLoading(false)

        // User has not yet added any weight records
        router.push("/pages/home/home");
      }
    } catch (err) {
      setIsLoading(false)

      console.error(err);
    }
  };
  return (
    <div className={styles.logincontainer}>
      {isLoading && <Spinner></Spinner>}
      <div className={styles.mobile}>
        <div className={styles.picture}></div>
        <div className={styles.controlllog}>
          <form onSubmit={handleSubmit}>
            <div className={styles.fixform}>
              <span>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <label htmlFor="email">Email</label>
              <input
                className={styles.fff}
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleEmailChange}
              />
            </div>
            <div className={styles.fixform}>
              <span>
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              </span>
              <label htmlFor="password">Password</label>
              <input
                className={styles.fff}
                type="password"
                id="password"
                value={password}
                placeholder="Enter your password"
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            <Link href="/pages/register/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

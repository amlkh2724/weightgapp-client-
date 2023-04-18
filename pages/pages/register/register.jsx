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
            <Link href="/pages/login/login">
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: "#000000", width: "4rem" }}
                className="fa-fade"
              />
            </Link>
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


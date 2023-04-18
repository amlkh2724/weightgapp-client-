import React from "react";

import Link from "next/link";

import styles from "@/styles/Navbar.module.css";
const Navbar = () => {
  return (
    <>
      <div className="menu-wrap">
        <input type="checkbox" className="toggler" />
        <div className="hamburger">
          <div />
        </div>
        <div className="menu">
          <div>
            <div>
              <ul className="flex-container">
                <li>
                  <Link href="/pages/weeklytracker/weeklyweight">Weekly</Link>
                </li>
                <li>
                  <Link href="/pages/weightgrafic/weightgrafic">daily weight tracking</Link>
                </li>
                <li>
                  <Link href="/pages/historyWeeks/historyWeeks">HistoryWeeks</Link>
                </li>
                <li>
                  <Link href="https://chat-questions.onrender.com/">Chat</Link>
                </li>
                <li>
                  <Link href="/">
                  logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.navbar__content}>
          <Link href="/">
            <h4 className={styles.logout}>logout</h4>
          </Link>
          <div className={styles.navbar__links}>
            <Link href="/pages/weeklytracker/weeklyweight">
              <h1 className={styles.navbar__link}>Weekly</h1>
            </Link>
            <Link href="/pages/weightgrafic/weightgrafic">
              <h1 className={styles.navbar__link}>daily weight tracking</h1>
            </Link>
            <Link href="/pages/historyWeeks/historyWeeks">
              <h1 className={styles.navbar__link}>HistoryWeeks</h1>
            </Link>
            <Link href="https://chat-questions.onrender.com/">
              <h1 className={styles.navbar__link}>Chat</h1>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

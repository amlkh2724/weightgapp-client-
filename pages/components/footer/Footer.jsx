import React from "react";
import styles from '@/styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <p className={styles.footer__text}>© 2023 Weekly Weight Tracker</p>
      </div>
    </footer>
  );
};

export default Footer;

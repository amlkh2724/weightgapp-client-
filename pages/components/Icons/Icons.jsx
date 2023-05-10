import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Icons = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faEnvelope} />
      <FontAwesomeIcon icon={faLock} />
    </div>
  );
};
export default Icons;

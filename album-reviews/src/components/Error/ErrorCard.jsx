import classes from "./ErrorCard.module.css";

import { useRouteError, useNavigate } from "react-router-dom";
import { WarningCircle } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

// This component is displayed when an error occurs and explains what happened.
// It prompts the user to go back or wait 10 seconds.

const ErrorCard = () => {
  const [timer, setTimer] = useState(10);
  let error = useRouteError();
  const navigate = useNavigate();

  // This controls the timer.
  useEffect(() => {
    const timerHandler = setTimeout(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);
    if (timer === 0) {
      navigate("..");
    }
  }, [timer]);

  // Go back to the previous page.
  const navigateHandler = () => {
    navigate("..");
  };

  return (
    <div className={classes.errorContainer}>
      <div className={classes.errorCard}>
        <WarningCircle
          size={48}
          color="red"
          weight="light"
        />
        <h1 className={classes.errorTitle}>Oops! Something went wrong!</h1>
        <p className={classes.errorMessage}>{error?.message}</p>
        <button
          onClick={navigateHandler}
          className={classes.errorButton}
        >
          Go back
        </button>
        <p className={classes.errorTimer}>or</p>
        <p className={classes.errorTimer}>Wait {timer} seconds</p>
      </div>
    </div>
  );
};

export default ErrorCard;

import classes from "./ReviewScore.module.css";

import { useEffect, useState } from "react";

// This component displays the score of an album and changes appearance based on the score.
// The onCard prop is used to determine if the component is being used on the album card or the album detail page,
// and changes the style accordingly.
const ReviewScore = ({ score, onCard, style }) => {
  const [scoreClass, setScoreClass] = useState();
  const [scoreText, setScoreText] = useState();

  useEffect(() => {
    if (score > -1 && score < 16) {
      setScoreClass(classes["non-song"]);
      setScoreText("Non-music");
    } else if (score > 15 && score < 26) {
      setScoreClass(classes.awful);
      setScoreText("Awful");
    } else if (score > 25 && score < 41) {
      setScoreClass(classes.bad);
      setScoreText("Bad");
    } else if (score > 40 && score < 60) {
      setScoreClass(classes.meh);
      setScoreText("Meh");
    } else if (score > 59 && score < 71) {
      setScoreClass(classes.good);
      setScoreText("Good");
    } else if (score > 70 && score < 86) {
      setScoreClass(classes.great);
      setScoreText("Great");
    } else if (score > 85 && score < 100) {
      setScoreClass(classes.amazing);
      setScoreText("Amazing");
    } else if (score > 99 && score < 101) {
      setScoreClass(classes.perfect);
      setScoreText("Perfect");
    }
  }, [score]);

  const onCardClass = onCard === true ? classes.onCardPosition : style;
  const sizeClass = onCard === true ? classes.small : classes.large;
  const textSizeClass = onCard === true ? classes.smallText : classes.largeText;

  return (
    <div className={`${classes.scoreContainer} ${onCardClass}`}>
      <div className={`${classes.circle} ${scoreClass} ${sizeClass}`}>
        <div className={classes.innerCircle}>{score}</div>
      </div>
      {onCard !== true && (
        <p className={`${classes.scoreText} ${scoreClass} ${textSizeClass}`}>
          {scoreText}
        </p>
      )}
    </div>
  );
};

export default ReviewScore;

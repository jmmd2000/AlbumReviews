import classes from "./FormSelect.module.css";

import { useState } from "react";

// This component displays a single track along with a dropdown menu for selecting a rating for that track.

const FormSelect = ({ track, presetScore }) => {
  // If there is already a score (i.e. I am editing a review), set the score to the preset score.
  const [score, setScore] = useState(presetScore);
  var parsedName = track.name.replace(/\s+/g, "");
  parsedName = parsedName.toLowerCase();

  const getSelectColor = (rating) => {
    switch (rating) {
      case "7":
        return classes.perfect;
      case "6":
        return classes.amazing;
      case "5":
        return classes.great;
      case "4":
        return classes.good;
      case "3":
        return classes.meh;
      case "2":
        return classes.bad;
      case "1":
        return classes.awful;
      case "0":
        return classes.nonSong;
      default:
        return classes.noRating;
    }
  };

  var artistNames = "";

  // This loop is used to display the artist names in the track in a nice format.
  for (var i = 0; i < track.artists.length; i++) {
    if (i === track.artists.length - 1) {
      artistNames += track.artists[i].name;
      break;
    } else {
      artistNames += track.artists[i].name + ", ";
    }
  }

  return (
    <div className={classes.formContainer}>
      <label
        htmlFor={"rating_" + track.track_number}
        className={classes.formLabel}
      >
        {track.track_number + ". "}
        {track.name + " - "}
        {<span className={classes.artistNames}>{artistNames}</span>}
      </label>
      {track.explicit === true && (
        <span className={classes.explicitIcon}>E</span>
      )}
      <select
        name={"rating_" + track.track_number}
        className={classes.formSelect + " " + getSelectColor(score)}
        onChange={(e) => setScore(e.target.value)}
        required
        id={track.track_number}
        defaultValue={presetScore ? presetScore : "null"}
      >
        <option
          value="null"
          className={classes.formSelectOption}
        >
          Score
        </option>
        <option
          value="7"
          className={classes.formSelectOption + " " + classes.perfect}
        >
          Perfect
        </option>
        <option
          value="6"
          className={classes.formSelectOption + " " + classes.amazing}
        >
          Amazing
        </option>
        <option
          value="5"
          className={classes.formSelectOption + " " + classes.great}
        >
          Great
        </option>
        <option
          value="4"
          className={classes.formSelectOption + " " + classes.good}
        >
          Good
        </option>
        <option
          value="3"
          className={classes.formSelectOption + " " + classes.meh}
        >
          Meh
        </option>
        <option
          value="2"
          className={classes.formSelectOption + " " + classes.bad}
        >
          Bad
        </option>
        <option
          value="1"
          className={classes.formSelectOption + " " + classes.awful}
        >
          Awful
        </option>
        <option
          value="0"
          className={classes.formSelectOption + " " + classes.nonSong}
        >
          Non-Song
        </option>
      </select>
    </div>
  );
};

export default FormSelect;

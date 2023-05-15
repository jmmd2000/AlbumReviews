import { useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./OptionButtons.module.css";
import { deleteAlbum } from "../../../firebase/firestore";

const OptionButtons = ({ albumID, artistID }) => {
  const [delState, setDelState] = useState();
  const navigate = useNavigate();
  const deleteAlbumHandler = async () => {
    await deleteAlbum(albumID, artistID);
    navigate("/albums");
  };
  return (
    <div className={classes.buttonContainer}>
      <p>{delState}</p>
      <button className={`${classes.button} ${classes.edit}`}>Edit</button>
      <button
        className={`${classes.button} ${classes.delete}`}
        onClick={deleteAlbumHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default OptionButtons;

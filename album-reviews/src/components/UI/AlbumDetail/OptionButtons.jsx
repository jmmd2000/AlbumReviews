import classes from "./OptionButtons.module.css";

import { useNavigate } from "react-router-dom";
import { deleteAlbum } from "../../../firebase/firestore";

// This component displays the edit and delete buttons for an album
// It uses the deleteAlbum function from firestore.js to delete an album
// It uses the useNavigate hook to navigate to the edit albums page

const OptionButtons = ({ albumID, artistID }) => {
  const navigate = useNavigate();

  const deleteAlbumHandler = async () => {
    await deleteAlbum(albumID, artistID);
    navigate("/albums");
  };

  const editAlbumHandler = () => {
    navigate(`/albums/${albumID}/edit`);
  };
  return (
    <div className={classes.buttonContainer}>
      <button
        className={`${classes.button} ${classes.edit}`}
        onClick={editAlbumHandler}
      >
        Edit
      </button>
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

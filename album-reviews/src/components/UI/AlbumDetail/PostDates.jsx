import classes from "./PostDates.module.css";

import useDate from "../../../hooks/use-date";

// This component displays the post date and edit date of an album review
// It uses the useDate hook to format the dates.
// Edit date is not in use at the moment.

const PostDates = ({ postDate, editDate }) => {
  const postDateParsed = useDate(postDate);
  const editDateParsed = useDate(editDate);
  return (
    <div className={classes.postDates}>
      <p className={classes.postDate}>Posted on {postDateParsed}</p>
      {editDate !== undefined && (
        <p className={classes.postDate}>Edited on {editDateParsed}</p>
      )}
    </div>
  );
};

export default PostDates;

import classes from "./CommentSection.module.css";

// This component displays the comments for an album.
const CommentSection = (comment) => {
  var modifiedComment = JSON.stringify(comment.comments);
  modifiedComment = modifiedComment.substring(1, modifiedComment.length - 1);
  return (
    <div className={classes.container}>
      <p className={classes.commentHeading}>Comments</p>
      <p className={classes.commentContent}>{modifiedComment}</p>
    </div>
  );
};

export default CommentSection;

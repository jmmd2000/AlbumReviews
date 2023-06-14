import classes from "./CommentSection.module.css";

// This component displays the comments for an album.
const CommentSection = (comment) => {
  var modifiedComment = JSON.stringify(comment.comments);
  modifiedComment = modifiedComment.substring(1, modifiedComment.length - 1);
  modifiedComment = parseComment(modifiedComment);
  return (
    <div className={classes.container}>
      <p className={classes.commentHeading}>Comments</p>
      {/* <p className={classes.commentContent}>{modifiedComment}</p> */}
      <p
        className={classes.commentContent}
        dangerouslySetInnerHTML={{ __html: modifiedComment }}
      ></p>
    </div>
  );
};

export default CommentSection;

const parseComment = (comment) => {
  // **bold**
  comment = comment.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // *italic*
  comment = comment.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // _underline_
  comment = comment.replace(/_(.*?)_/g, "<u>$1</u>");
  // line break
  comment = comment.replace(/\\n/g, "<br />");

  return comment;
};

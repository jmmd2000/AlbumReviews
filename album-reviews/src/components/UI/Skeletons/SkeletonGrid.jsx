import classes from "../Grid.module.css";
import Skeleton from "@mui/material/Skeleton";

const SkeletonGrid = () => {
  const skeletons = 12;
  return (
    <div className={classes.grid}>
      {[...Array(skeletons)].map((e, i) => (
        <Skeleton
          key={i}
          variant="rectangular"
          height={250}
          width={250}
        />
      ))}
    </div>
  );
};

export default SkeletonGrid;

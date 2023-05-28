import classes from "../Grid.module.css";

import Skeleton from "@mui/material/Skeleton";

// This allows me to display a grid of custom skeletons while data is loading.

const SkeletonGrid = ({ height, width, num, shape, filters }) => {
  return (
    <>
      {filters && (
        <div className={classes.filterSkeleton}>
          <Skeleton
            variant="rectangular"
            height={54}
            width={500}
          />
        </div>
      )}
      <div className={classes.grid}>
        {[...Array(num)].map((e, i) => (
          <Skeleton
            key={i}
            variant={shape}
            height={height}
            width={width}
          />
        ))}
      </div>
    </>
  );
};

export default SkeletonGrid;

import { ColorRing } from "react-loader-spinner";

// This component displays a custom loading spinner with the colours of the review scores.
const LoadingSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{
        display: "block",
        margin: "auto",
      }}
      wrapperClass="blocks-wrapper"
      colors={[
        "#9b59b6",
        "#5c7cfa",
        "#339af0",
        "#51cf66",
        "#f1c40f",
        "#e67e22",
        "#e74c3c",
        "#34495e",
      ]}
    />
  );
};

export default LoadingSpinner;

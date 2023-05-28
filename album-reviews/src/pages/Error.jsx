import ErrorCard from "../components/Error/ErrorCard";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let error = useRouteError();
  return <ErrorCard error={error} />;
};

export default ErrorPage;

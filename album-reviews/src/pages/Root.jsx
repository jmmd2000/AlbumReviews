import { Outlet } from "react-router-dom";

import Navigation from "../components/Layout/Navigation";

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default RootLayout;

import { Outlet } from "react-router-dom";

import Navigation from "../components/Layout/Navigation";

const ArtistsRootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ArtistsRootLayout;

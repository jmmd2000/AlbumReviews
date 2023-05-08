import { Outlet } from "react-router-dom";

import Navigation from "../components/Layout/Navigation";

const AlbumsRootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AlbumsRootLayout;
